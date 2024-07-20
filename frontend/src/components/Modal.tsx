import React from "react";
import Modal from "react-modal";
import { LogFormData } from "../forms/ManageLogForm/ManageLogForm"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import dayjs from "dayjs";

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
  if (!log) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Exercise Details"
      className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">
        {dayjs(log.date).add(5, "hour").format("MMMM D, YYYY")}
      </h2>
      <div className="space-y-4">
        <p>Location: {log.location}</p>
        <p>Time Spent: {log.timeSpent} minutes</p>
        <p>Split Day: {log.splitDay}</p>
        <div>
          <h3 className="text-xl font-semibold">Exercises</h3>
          <ul className="list-disc ml-5">
            {log.exercises.map((exercise, index) => (
              <li key={index}>
                <strong>{exercise.name}</strong>
                <ul className="list-disc ml-5">
                  {exercise.sets.map((set, setIndex) => (
                    <li key={setIndex}>
                      Weight: {set.weight}, Reps: {set.reps}, RPE: {set.rpe}, To
                      Failure: {set.toFailure ? "Yes" : "No"}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span className="flex justify-end gap-4">
        <button
          onClick={onRequestClose}
          className="mt-4 bg-blue-600 text-white p-2 rounded"
        >
          Close
        </button>
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
