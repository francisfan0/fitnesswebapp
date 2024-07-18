import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import ImagesSection from "./ImagesSection";

export type ProfileFormData = {
  bodyweight: number;
  height: number;
  age: number;
  gender: string;
  yearsOE: number;
  goals: string;
  imageFiles: FileList;
};

type Props = {
  onSave: (profileFormData: FormData) => void;
  isLoading: boolean;
};

const ManageProfileForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<ProfileFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: ProfileFormData) => {
    console.log(formDataJson);
    const formData = new FormData();
    formData.append("bodyweight", formDataJson.bodyweight.toString());
    formData.append("height", formDataJson.height.toString());
    formData.append("age", formDataJson.age.toString());
    formData.append("gender", formDataJson.gender);
    formData.append("yearsOE", formDataJson.yearsOE.toString());
    formData.append("goals", formDataJson.goals);

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
