import { useFieldArray, useFormContext } from "react-hook-form";
import { LogFormData } from "./ManageLogForm";

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
    <div className="flex flex-col gap-2">
      {setFields.map((set, setIndex) => (
        <div key={set.id} className="flex gap-2">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Weight
            <input
              type="number"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register(`exercises.${index}.sets.${setIndex}.weight`, {
                required: "Weight is required",
              })}
            />
            {errors.exercises?.[index]?.sets?.[setIndex]?.weight && (
              <span className="text-red-500">
                {errors.exercises[index]?.sets?.[setIndex]?.weight?.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Reps
            <input
              type="number"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register(`exercises.${index}.sets.${setIndex}.reps`, {
                required: "Reps are required",
              })}
            />
            {errors.exercises?.[index]?.sets?.[setIndex]?.reps && (
              <span className="text-red-500">
                {errors.exercises[index]?.sets?.[setIndex]?.reps?.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            RPE
            <input
              type="number"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register(`exercises.${index}.sets.${setIndex}.rpe`, {
                required: "RPE is required",
              })}
            />
            {errors.exercises?.[index]?.sets?.[setIndex]?.rpe && (
              <span className="text-red-500">
                {errors.exercises[index]?.sets?.[setIndex]?.rpe?.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            To Failure
            <input
              type="checkbox"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register(`exercises.${index}.sets.${setIndex}.toFailure`)}
            />
          </label>
          <button type="button" onClick={() => removeSet(setIndex)}>
            Remove Set
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendSet({ weight: 0, reps: 0, rpe: 0, toFailure: false })
        }
      >
        Add Set
      </button>
    </div>
  );
};

export default ExerciseNested;
