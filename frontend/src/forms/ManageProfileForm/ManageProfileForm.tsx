import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import ImagesSection from "./ImagesSection";
import { ProfileType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type ProfileFormData = {
  bodyweight: number;
  height: number;
  age: number;
  gender: string;
  yearsOE: number;
  goals: string;
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  onSave: (profileFormData: FormData) => void;
  isLoading: boolean;
  profile?: ProfileType;
};

const ManageProfileForm = ({ onSave, isLoading, profile }: Props) => {
  const formMethods = useForm<ProfileFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(profile);
  }, [profile, reset]);

  const onSubmit = handleSubmit((formDataJson: ProfileFormData) => {
    console.log(formDataJson);
    const formData = new FormData();
    if (profile) {
      formData.append("profileId", profile._id);
    }
    if (formDataJson.bodyweight)
      formData.append("bodyweight", formDataJson.bodyweight.toString());
    if (formDataJson.height)
      formData.append("height", formDataJson.height.toString());
    if (formDataJson.age) formData.append("age", formDataJson.age.toString());
    if (formDataJson.gender) formData.append("gender", formDataJson.gender);
    if (formDataJson.yearsOE)
      formData.append("yearsOE", formDataJson.yearsOE.toString());
    if (formDataJson.goals) formData.append("goals", formDataJson.goals);

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="rounded bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageProfileForm;
