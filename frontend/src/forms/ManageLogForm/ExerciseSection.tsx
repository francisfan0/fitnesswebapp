import { useFieldArray, useFormContext } from "react-hook-form";
import { LogFormData } from "./ManageLogForm";
import ExerciseNested from "./ExerciseNested";
import { exerciseTypes } from "../../config/exercise-options-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ExerciseSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<LogFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-500 mb-3">Exercises</h2>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col gap-2 p-4 bg-white rounded shadow"
        >
          <label className="text-gray-700 text-sm font-bold flex-1">
            Exercise Name
            <select
              className="border rounded w-full py-1 px-2 font-normal mt-1"
              {...register(`exercises.${index}.name`, {
                required: "Exercise name is required",
              })}
            >
              <option value="" disabled>
                Select an exercise
              </option>
              {exerciseTypes.map((exercise, i) => (
                <option key={i} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
            {errors.exercises?.[index]?.name && (
              <span className="text-red-500 text-sm">
                {errors.exercises[index]?.name?.message}
              </span>
            )}
          </label>
          <ExerciseNested index={index} />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 hover:text-red-700 mt-2 self-start"
          >
            <FontAwesomeIcon icon={faMinus} className="mr-2" />
            Remove Exercise
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            sets: [{ weight: 0, reps: 0, rir: 0, toFailure: false }],
          })
        }
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 self-start"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Exercise
      </button>
    </div>
  );
};

export default ExerciseSection;
