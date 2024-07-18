import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 3000; // 5 seconds
    const intervalTime = 50; // update every 50ms
    const decrement = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => Math.max(prev - decrement, 0));
    }, intervalTime);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-sm w-full sm:w-auto"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-sm w-full sm:w-auto";

  return (
    <div className={styles}>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 bg-transparent text-white rounded-full p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition"
        >
          <span className="text-lg font-bold">&times;</span>
        </button>
      </div>
      <div className="relative w-full h-1 mt-2 rounded overflow-hidden bg-gray-200">
        <div
          className="absolute left-0 top-0 h-full bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
