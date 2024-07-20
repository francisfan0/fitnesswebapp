import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import ManageLogForm from "../forms/ManageLogForm/ManageLogForm";
import { useNavigate } from "react-router-dom";

const AddLogs = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiClient.addLog, {
    onSuccess: () => {
      showToast({ message: "Workout saved!", type: "SUCCESS" });
      navigate("/my-logs");
    },
    onError: () => {
      showToast({ message: "Error saving workout", type: "ERROR" });
    },
  });

  const handleSave = (logFormData: FormData) => {
    mutate(logFormData);
  };

  return <ManageLogForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddLogs;
