import { useFormContext } from "react-hook-form";
import { LogFormData } from "./ManageLogForm";

const LogSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LogFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Log your workout</h1>
      <h2 className="text-2xl font-bold mb-3">Details</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Date
        <input
          type="date"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("date", {
            required: "Date is required",
          })}
        ></input>
        {errors.date && (
          <span className="text-red-500">{errors.date.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Time Spent (in minutes)
        <input
          type="number"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("timeSpent", {
            required: "Time spent is required",
          })}
        ></input>
        {errors.timeSpent && (
          <span className="text-red-500">{errors.timeSpent.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Which day of split (ie Chest-back, Push, etc)
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("splitDay", {
            required: "Day of split is required",
          })}
        ></input>
        {errors.splitDay && (
          <span className="text-red-500">{errors.splitDay.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Location
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("location", {
            required: "Location is required",
          })}
        ></input>
        {errors.location && (
          <span className="text-red-500">{errors.location.message}</span>
        )}
      </label>
    </div>
  );
};

export default LogSection;
