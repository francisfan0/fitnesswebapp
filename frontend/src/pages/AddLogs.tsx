import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import ManageLogForm from "../forms/ManageLogForm/ManageLogForm";

const AddLogs = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addLog, {
    onSuccess: () => {
      showToast({ message: "Workout saved!", type: "SUCCESS" });
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
