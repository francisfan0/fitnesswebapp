import { useFormContext } from "react-hook-form";
import { ProfileFormData } from "./ManageProfileForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Profile</h1>
      <h4 className="text-xl text-gray-500">All fields are optional</h4>
      <h2 className="text-2xl font-bold mb-3">Details</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Bodyweight (in pounds)
        <input
          type="number"
          min={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("bodyweight")}
        ></input>
        {errors.bodyweight && (
          <span className="text-red-500">{errors.bodyweight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Height (in inches)
        <input
          type="number"
          min={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("height")}
        ></input>
        {errors.height && (
          <span className="text-red-500">{errors.height.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Age
        <input
          type="number"
          min={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("age")}
        ></input>
        {errors.age && (
          <span className="text-red-500">{errors.age.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Gender
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("gender")}
        ></input>
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Years of experience
        <input
          type="number"
          min={0}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("yearsOE")}
        ></input>
        {errors.yearsOE && (
          <span className="text-red-500">{errors.yearsOE.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Goals
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("goals")}
        ></input>
        {errors.goals && (
          <span className="text-red-500">{errors.goals.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
