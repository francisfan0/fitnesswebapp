import { useFieldArray, useFormContext } from "react-hook-form";
import { LogFormData } from "./ManageLogForm";
import ExerciseNested from "./ExerciseNested";
import { exerciseTypes } from "../../config/exercise-options-config";

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
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-3">Exercises</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Exercise Name
            {/* <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register(`exercises.${index}.name`, {
                required: "Exercise name is required",
              })}
            /> */}
            <select
              className="border rounded w-full py-1 px-2 font-normal"
              {...register(`exercises.${index}.name`, {
                required: "Exercise name is required",
              })}
            >
              {exerciseTypes.map((exercise, i) => (
                <option key={i} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
            {errors.exercises?.[index]?.name && (
              <span className="text-red-500">
                {errors.exercises[index]?.name?.message}
              </span>
            )}
          </label>
          <ExerciseNested index={index} />
          <button type="button" onClick={() => remove(index)}>
            Remove Exercise
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            sets: [{ weight: 0, reps: 0, rpe: 0, toFailure: false }],
          })
        }
      >
        Add Exercise
      </button>
    </div>
  );
};

export default ExerciseSection;
