import { useMutation } from "react-query";
import ManageProfileForm from "../forms/ManageProfileForm/ManageProfileForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddProfile = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyProfile, {
    onSuccess: () => {
      showToast({ message: "Profile saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving profile", type: "ERROR" });
    },
  });

  const handleSave = (profileFormData: FormData) => {
    mutate(profileFormData);
  };

  return <ManageProfileForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddProfile;
