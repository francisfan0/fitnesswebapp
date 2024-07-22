import React from "react";
import Modal from "react-modal";
import { LineGraphData } from "../pages/MyCharts";
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
import dayjs from "dayjs";

Modal.setAppElement("#root");

type ExerciseModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  log: LineGraphData | null;
};

const ChartModal: React.FC<ExerciseModalProps> = ({
  isOpen,
  onRequestClose,
  log,
}) => {
  if (!log) return null;

  const formatDate = (
    date: string | number | Date | dayjs.Dayjs | null | undefined
  ) => dayjs(date).add(5, "hour").format("MMM D, YYYY");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Exercise Details"
      className="bg-white p-8 rounded-lg shadow-lg max-w-3xl max-h-[70vh] mx-auto mt-20 overflow-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{log.name}</h2>
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

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={log.data}
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
    </Modal>
  );
};

export default ChartModal;
