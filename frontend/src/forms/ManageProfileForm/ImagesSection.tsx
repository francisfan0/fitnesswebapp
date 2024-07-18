import { useFormContext } from "react-hook-form";
import { ProfileFormData } from "./ManageProfileForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Profile Picture</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength > 1) {
                return "Cannot input more than one image";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
