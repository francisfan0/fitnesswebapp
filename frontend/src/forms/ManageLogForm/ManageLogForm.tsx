import { FormProvider, useForm } from "react-hook-form";
import LogSection from "./LogSection";
import ExerciseSection from "./ExerciseSection";
import dayjs from "dayjs";
import { LogType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
import utc from "dayjs/plugin/utc";

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
  _id: string; // delete if necessary
  date: Date;
  timeSpent: number;
  splitDay: string;
  location: string;
  exercises: ExerciseFormData[];
};

type Props = {
  log?: LogType;
  onSave: (logFormData: FormData) => void;
  isLoading: boolean;
};

const ManageLogForm = ({ onSave, isLoading, log }: Props) => {
  const formMethods = useForm<LogFormData>();
  dayjs.extend(utc);

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (log) {
      // Use dayjs to format the date to YYYY-MM-DD
      const date = dayjs(log.date).add(5, "hour").toDate();
      reset({
        ...log,
        date: date, // Use formatted date string for input
      });
    } else {
      reset({
        date: dayjs(new Date()).toDate(), // Default to current date in YYYY-MM-DD format
        timeSpent: 0,
        splitDay: "",
        location: "",
        exercises: [],
      });
    }
  }, [log, reset]);

  const onSubmit = handleSubmit((formDataJson: LogFormData) => {
    console.log(formDataJson);
    const formData = new FormData();
    if (log) {
      formData.append("logId", log._id);
    }
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
