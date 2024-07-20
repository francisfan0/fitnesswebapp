import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import ExerciseModal from "../components/Modal";
import { LogFormData } from "../forms/ManageLogForm/ManageLogForm"; // Adjust the import path as necessary
import dayjs from "dayjs";

const MyLogs = () => {
  const { showToast } = useAppContext();
  const { data: logData } = useQuery<LogFormData[]>(
    "fetchMyLogs",
    apiClient.fetchMyLogs,
    {
      onError: () => {
        showToast({ message: "Error fetching logs", type: "ERROR" });
      },
    }
  );

  const [selectedLog, setSelectedLog] = useState<LogFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (log: LogFormData) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLog(null);
    setIsModalOpen(false);
  };

  if (!logData) {
    return <span>No Logs Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Logs</h1>
        <Link
          to="/add-log"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded"
        >
          Add Log
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {logData.map((log) => (
          <div
            key={log._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2
              className="text-2xl font-bold cursor-pointer"
              onClick={() => openModal(log)}
            >
              {dayjs(log.date).add(5, "hour").format("MMMM D, YYYY")}
            </h2>
            <div className="whitespace-pre-line">
              Today was a {log.splitDay} day
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                {log.location}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                {log.timeSpent} minutes spent
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                {log.exercises.length} exercises performed
              </div>
            </div>
          </div>
        ))}
      </div>
      <ExerciseModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        log={selectedLog}
      />
    </div>
  );
};

export default MyLogs;
