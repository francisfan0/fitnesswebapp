import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import ManageProfileForm from "../forms/ManageProfileForm/ManageProfileForm";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { data: profile } = useQuery("fetchMyProfile", () =>
    apiClient.fetchMyProfile()
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyProfile, {
    onSuccess: () => {
      showToast({ message: "Profile saved!", type: "SUCCESS" });
      navigate("/");
    },
    onError: () => {
      showToast({ message: "Error saving profile", type: "ERROR" });
    },
  });

  const handleSave = (profileFormData: FormData) => {
    mutate(profileFormData);
  };

  return (
    <ManageProfileForm
      profile={profile}
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
};

export default EditProfile;
