import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { LogFormData } from "./ManageLogForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faDumbbell,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const LogSection = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<LogFormData>();

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-3">
        Log your workout
      </h1>
      <h2 className="text-2xl font-bold text-blue-500 mb-3">Details</h2>
      <label className="text-gray-700 text-sm font-bold flex items-center gap-2">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
        Date
        <Controller
          name="date"
          control={control}
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <div className="relative w-full">
              <DatePicker
                id="date"
                selected={field.value ? dayjs(field.value).toDate() : null}
                onChange={(date) => {
                  if (date) {
                    var newDate = dayjs(date).utcOffset("-5:00");
                    field.onChange(newDate.format("YYYY-MM-DD"));
                  }
                }}
                dateFormat="yyyy-MM-dd"
                className="border rounded w-full py-1 px-2 font-normal"
              />
              {errors.date && (
                <span className="absolute text-red-600 text-sm top-full left-0">
                  {errors.date.message}
                </span>
              )}
            </div>
          )}
        />
      </label>
      <label className="text-gray-700 text-sm font-bold flex items-center gap-2">
        <FontAwesomeIcon icon={faClock} className="text-blue-500" />
        Time Spent (in minutes)
        <input
          type="number"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("timeSpent", {
            required: "Time spent is required",
            min: {
              value: 0,
              message: "Time spent must be at least 0",
            },
          })}
        ></input>
        {errors.timeSpent && (
          <span className="text-red-500">{errors.timeSpent.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex items-center gap-2">
        <FontAwesomeIcon icon={faDumbbell} className="text-blue-500" />
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
      <label className="text-gray-700 text-sm font-bold flex items-center gap-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
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
