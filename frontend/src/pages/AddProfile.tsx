import { useMutation, useQueryClient } from "react-query";
import ManageProfileForm from "../forms/ManageProfileForm/ManageProfileForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const AddProfile = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiClient.addMyProfile, {
    onSuccess: async () => {
      showToast({ message: "Profile saved!", type: "SUCCESS" });
      await queryClient.invalidateQueries("hasPFP");
      navigate("/");
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
