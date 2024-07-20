import { FormProvider, useForm } from "react-hook-form";
import LogSection from "./LogSection";
import ExerciseSection from "./ExerciseSection";

export type SetFormData = {
  weight: number;
  reps: number;
  rpe: number;
  toFailure: boolean;
};

export type ExerciseFormData = {
  name: string;
  sets: SetFormData[];
};

export type LogFormData = {
  date: Date;
  timeSpent: number;
  splitDay: string;
  location: string;
  exercises: ExerciseFormData[];
};

type Props = {
  onSave: (logFormData: FormData) => void;
  isLoading: boolean;
};

const ManageLogForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<LogFormData>();

  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: LogFormData) => {
    console.log(formDataJson);
    const formData = new FormData();
    formData.append("date", formDataJson.date.toString());
    formData.append("timeSpent", formDataJson.timeSpent.toString());
    formData.append("splitDay", formDataJson.splitDay);
    formData.append("location", formDataJson.location);

    formDataJson.exercises.forEach((exercise, exerciseIndex) => {
      formData.append(`exercises[${exerciseIndex}][name]`, exercise.name);
      exercise.sets.forEach((set, setIndex) => {
        formData.append(
          `exercises[${exerciseIndex}][sets][${setIndex}][weight]`,
          set.weight.toString()
        );
        formData.append(
          `exercises[${exerciseIndex}][sets][${setIndex}][reps]`,
          set.reps.toString()
        );
        formData.append(
          `exercises[${exerciseIndex}][sets][${setIndex}][rpe]`,
          set.rpe.toString()
        );
        formData.append(
          `exercises[${exerciseIndex}][sets][${setIndex}][toFailure]`,
          set.toFailure.toString()
        );
      });
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <LogSection></LogSection>
        <ExerciseSection></ExerciseSection>
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="rounded bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save Workout"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageLogForm;
