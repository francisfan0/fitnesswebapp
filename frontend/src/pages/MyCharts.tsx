import "./css/HomePage.css";
import { LogFormData, SetFormData } from "../forms/ManageLogForm/ManageLogForm";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
// import { useEffect } from "react";
import ChartModal from "../components/ChartModal";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

export type LineGraphData = {
  name: string;
  data: {
    date: Date;
    weight: number;
    reps: number;
  }[];
};

export function transformLogsToLineGraphData(
  logs: LogFormData[]
): LineGraphData[] {
  const exerciseMap: {
    [key: string]: { date: Date; weight: number; reps: number }[];
  } = {};

  logs.forEach((log) => {
    log.exercises.forEach((exercise) => {
      if (!exerciseMap[exercise.name]) {
        exerciseMap[exercise.name] = [];
      }

      let maxSet: SetFormData | null = null;
      exercise.sets.forEach((set) => {
        if (!maxSet || set.weight > (maxSet as SetFormData).weight) {
          maxSet = set;
        }
      });

      if (maxSet) {
        exerciseMap[exercise.name].push({
          date: log.date,
          weight: (maxSet as SetFormData).weight,
          reps: (maxSet as SetFormData).reps,
        });
      }
    });
  });

  return Object.keys(exerciseMap).map((exerciseName) => ({
    name: exerciseName,
    data: exerciseMap[exerciseName],
  }));
}

const MyCharts = () => {
  const { data: logData } = useQuery<LogFormData[]>(
    "fetchMyLogs",
    apiClient.fetchMyLogs,
    {
      onError: () => {},
    }
  );

  const [selectedLog, setSelectedLog] = useState<LineGraphData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pinnedExercises, setPinnedExercises] = useState<LineGraphData[]>([]);

  if (!logData) return <div>No Logs found</div>;

  const lineGraphData = transformLogsToLineGraphData(logData);

  // useEffect(() => {
  //   // Load pinned exercise names from localStorage
  //   console.log("Loading pinned exercises from localStorage");
  //   const savedExerciseNames = localStorage.getItem("pinnedExercises");
  //   if (savedExerciseNames) {
  //     const names = JSON.parse(savedExerciseNames);
  //     console.log("Found pinned exercise names:", names);

  //     setPinnedExercises(names);
  //   } else {
  //     console.log("No pinned exercises found in localStorage");
  //   }
  // }, []);

  // useEffect(() => {
  //   // Extract the names from pinnedExercises and save them to localStorage
  //   const exerciseNames = pinnedExercises.map((exercise) => exercise.name);
  //   console.log("Updating localStorage with exercise names:", exerciseNames);
  //   localStorage.setItem("pinnedExercises", JSON.stringify(exerciseNames));
  // }, [pinnedExercises]);

  const formatDate = (
    date: string | number | Date | dayjs.Dayjs | null | undefined
  ) => dayjs(date).add(5, "hour").format("MMM D, YYYY");

  const openModal = (exercise: LineGraphData) => {
    setSelectedLog(exercise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLog(null);
    setIsModalOpen(false);
  };

  const pinExercise = (exercise: LineGraphData) => {
    if (
      pinnedExercises.length < 4 &&
      !pinnedExercises.find((e) => e.name === exercise.name)
    ) {
      setPinnedExercises([...pinnedExercises, exercise]);
    }
  };

  const unpinExercise = (exercise: LineGraphData) => {
    setPinnedExercises(pinnedExercises.filter((e) => e.name !== exercise.name));
  };

  const ExerciseLineCharts = ({ data }: { data: LineGraphData }) => (
    <div style={{ marginBottom: "2rem" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const getLastPerformedDate = (exerciseData: LineGraphData) => {
    // Extract dates from the exercise data
    const dates = exerciseData.data.map((item) => item.date);

    if (dates.length === 0) return "N/A";

    // Find the most recent date
    const latestDate = dates.reduce((latest, current) => {
      return dayjs(current).add(5, "hour").isAfter(dayjs(latest))
        ? current
        : latest;
    }, dates[0]);

    return formatDate(latestDate);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        Progress Tracker
      </h1>

      <div className="mb-8">
        <div className="p-6 border border-blue-300 rounded-lg bg-white shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Dashboard
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {pinnedExercises.map((exercise) => (
              <div
                key={exercise.name}
                className="flex flex-col justify-between border border-slate-300 rounded-lg p-6 gap-4 bg-white shadow-lg"
              >
                <span className="flex justify-between items-center">
                  <h3 className="font-bold text-2xl text-gray-800">
                    {exercise.name}
                  </h3>
                  <button
                    onClick={() => unpinExercise(exercise)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon
                      icon={faThumbtack}
                      style={{ marginRight: "8px" }}
                    />
                  </button>
                </span>
                <ExerciseLineCharts data={exercise} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">
          All Exercises
        </h2>
        <div className="grid grid-cols-1 gap-8">
          {lineGraphData.map((exercise) => (
            <div
              key={exercise.name}
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-6 gap-4 bg-white shadow-lg"
            >
              <span className="flex justify-between items-center">
                <button
                  onClick={() => openModal(exercise)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {exercise.name}
                </button>
                <p className="ml-4 text-gray-500">
                  Last time performed: {getLastPerformedDate(exercise)}
                </p>
                <button
                  onClick={() => pinExercise(exercise)}
                  className="text-green-500 hover:text-green-700"
                >
                  {pinnedExercises.find((e) => e.name === exercise.name) ? (
                    "Pinned"
                  ) : (
                    <FontAwesomeIcon
                      icon={faThumbtack}
                      style={{ marginRight: "8px" }}
                    />
                  )}
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedLog && (
        <ChartModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          log={selectedLog}
        />
      )}
    </div>
  );
};

export default MyCharts;
