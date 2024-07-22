import { useFieldArray, useFormContext } from "react-hook-form";
import { LogFormData } from "./ManageLogForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ExerciseNested = ({ index }: { index: number }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<LogFormData>();

  const {
    fields: setFields,
    append: appendSet,
    remove: removeSet,
  } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded shadow-md">
      {setFields.map((set, setIndex) => (
        <div
          key={set.id}
          className="flex gap-4 items-center p-2 bg-white rounded shadow-sm"
        >
          <label className="text-gray-700 text-sm font-bold flex-1">
            Weight
            <input
              type="number"
              className="border rounded w-full py-1 px-2 font-normal mt-1"
              {...register(`exercises.${index}.sets.${setIndex}.weight`, {
                required: "Weight is required",
                min: {
                  value: 0,
                  message: "Weight must be at least 0",
                },
              })}
            />
            {errors.exercises?.[index]?.sets?.[setIndex]?.weight && (
              <span className="text-red-500 text-sm">
                {errors.exercises[index]?.sets?.[setIndex]?.weight?.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Reps
            <input
              type="number"
              className="border rounded w-full py-1 px-2 font-normal mt-1"
              {...register(`exercises.${index}.sets.${setIndex}.reps`, {
                required: "Reps are required",
                min: {
                  value: 0,
                  message: "Reps must be at least 0",
                },
              })}
            />
            {errors.exercises?.[index]?.sets?.[setIndex]?.reps && (
              <span className="text-red-500 text-sm">
                {errors.exercises[index]?.sets?.[setIndex]?.reps?.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            RIR
            <input
              type="number"
              className="border rounded w-full py-1 px-2 font-normal mt-1"
              {...register(`exercises.${index}.sets.${setIndex}.rir`, {
                required: "RIR is required",
                min: {
                  value: 0,
                  message: "RIR must be at least 0",
                },
              })}
            />
            {errors.exercises?.[index]?.sets?.[setIndex]?.rir && (
              <span className="text-red-500 text-sm">
                {errors.exercises[index]?.sets?.[setIndex]?.rir?.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1 flex items-center gap-2">
            To Failure
            <input
              type="checkbox"
              className="mt-1"
              {...register(`exercises.${index}.sets.${setIndex}.toFailure`)}
            />
          </label>
          <button
            type="button"
            onClick={() => removeSet(setIndex)}
            className="text-red-500 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendSet({ weight: 0, reps: 0, rir: 0, toFailure: false })
        }
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 self-start"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Set
      </button>
    </div>
  );
};

export default ExerciseNested;
