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
    <div className="space-y-5 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold text-blue-600">My Logs</h1>
        <Link
          to="/add-log"
          className="flex items-center bg-blue-600 text-white text-xl font-bold py-2 px-4 hover:bg-blue-500 rounded transition duration-300"
        >
          Add Log
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {logData.map((log) => (
          <div
            key={log._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5 bg-white shadow-sm"
          >
            <h2
              className="text-2xl font-bold cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300"
              onClick={() => openModal(log)}
            >
              {dayjs(log.date).add(5, "hour").format("MMMM D, YYYY")}
            </h2>
            <div className="whitespace-pre-line text-gray-700">
              Today was a {log.splitDay} day
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center bg-gray-50">
                {log.location}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center bg-gray-50">
                {log.timeSpent} minutes spent
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center bg-gray-50">
                {log.exercises.length} exercises performed
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedLog && (
        <ExerciseModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          log={selectedLog}
        />
      )}
    </div>
  );
};

export default MyLogs;
