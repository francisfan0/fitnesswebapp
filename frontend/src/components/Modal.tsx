import React, { useState } from "react";
import Modal from "react-modal";
import { LogFormData } from "../forms/ManageLogForm/ManageLogForm"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import triangle from "../../public/assets/triangle.webp";

Modal.setAppElement("#root");

type ExerciseModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  log: LogFormData | null; // Allow null for the initial state
};

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  isOpen,
  onRequestClose,
  log,
}) => {
  // Use a Set to manage multiple expanded items
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(
    new Set()
  );

  if (!log) return null;

  const handleToggle = (index: number) => {
    setExpandedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index); // Remove if already expanded
      } else {
        newSet.add(index); // Add if not expanded
      }
      return newSet;
    });
  };

  return (
    // <Modal
    //   isOpen={isOpen}
    //   onRequestClose={onRequestClose}
    //   contentLabel="Exercise Details"
    //   className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-20"
    //   overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    // >
    //   <div className="flex items-center justify-between mb-4">
    //     <h2 className="text-2xl font-bold">
    //       {dayjs(log.date).add(5, "hour").format("MMMM D, YYYY")}
    //     </h2>
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Exercise Details"
      className="bg-white p-8 rounded-lg shadow-lg max-w-3xl max-h-[70vh] mx-auto mt-20 overflow-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {dayjs(log.date).add(5, "hour").format("MMMM D, YYYY")}
        </h2>
        <button
          onClick={onRequestClose}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
          <p>Location: {log.location}</p>
        </div>
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
          <p>Time Spent: {log.timeSpent} minutes</p>
        </div>
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
          <p>Split Day: {log.splitDay}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Exercises</h3>
          <ul className="list-none">
            {log.exercises.map((exercise, index) => (
              <li key={index} className="mb-2">
                <div
                  className="flex items-center cursor-pointer py-3"
                  onClick={() => handleToggle(index)}
                >
                  <img
                    src={triangle}
                    alt="Toggle"
                    className={`w-3 h-3 mr-2 transform transition-transform ${
                      expandedIndices.has(index) ? "rotate-90" : "rotate-0"
                    }`}
                  />
                  <span className="font-semibold">{exercise.name}</span>
                </div>
                {expandedIndices.has(index) && (
                  // <ul className="list-none ml-5">
                  //   {exercise.sets.map((set, setIndex) => (
                  //     <li key={setIndex} className="text-sm">
                  //       Weight: {set.weight}, Reps: {set.reps}, RIR: {set.rir},
                  //       To Failure: {set.toFailure ? "Yes" : "No"}
                  //     </li>
                  //   ))}
                  // </ul>
                  <ul className="list-none ml-5">
                    {exercise.sets.map((set, setIndex) => {
                      const ratio = set.rir === 0 ? 0 : set.reps / set.rir; // Avoid division by zero
                      const toFailure = set.toFailure;

                      // Calculate the background color based on the ratio
                      let backgroundColor;
                      if (toFailure) {
                        backgroundColor = "rgba(255, 99, 71, 0.3)"; // Light red color with opacity
                      } else {
                        // Scale the ratio to a range for color interpolation
                        const greenValue = Math.min(
                          Math.max((ratio / 2) * 255, 0),
                          255
                        );
                        const blueValue = Math.min(
                          Math.max((1 - ratio / 2) * 255, 0),
                          255
                        );
                        backgroundColor = `rgba(${0}, ${greenValue}, ${blueValue}, 0.3)`; // Dynamic color
                      }

                      return (
                        <div
                          key={setIndex}
                          className="relative group mb-2 p-4 border border-gray-300 rounded-lg shadow-sm"
                          style={{ backgroundColor }} // Apply dynamic background color
                        >
                          <li className="text-sm flex space-x-2">
                            <div className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center">
                              <span className="font-semibold text-gray-700">
                                Weight:
                              </span>
                              <span className="ml-2">{set.weight} lbs</span>
                            </div>
                            <div className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center">
                              <span className="font-semibold text-gray-700">
                                Reps:
                              </span>
                              <span className="ml-2">{set.reps}</span>
                            </div>
                            <div className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center">
                              <span className="font-semibold text-gray-700">
                                RIR:
                              </span>
                              <span className="ml-2">{set.rir}</span>
                            </div>
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span className="flex justify-end gap-4">
        <Link
          className="mt-4 bg-blue-600 text-white p-2 rounded"
          to={`/edit-log/${log._id}`}
        >
          Edit Log
        </Link>
      </span>
    </Modal>
  );
};

export default ExerciseModal;
