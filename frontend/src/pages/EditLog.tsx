import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageLogForm from "../forms/ManageLogForm/ManageLogForm";
import { useAppContext } from "../contexts/AppContext";

const EditLog = () => {
  const { logId } = useParams();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { data: log } = useQuery(
    "fetchMyLogById",
    () => apiClient.fetchMyLogById(logId || ""),
    {
      enabled: !!logId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyLogById, {
    onSuccess: () => {
      showToast({ message: "Log saved!", type: "SUCCESS" });
      navigate("/my-logs");
    },
    onError: () => {
      showToast({ message: "Error saving log", type: "ERROR" });
    },
  });

  const handleSave = (logFormData: FormData) => {
    mutate(logFormData);
  };

  return <ManageLogForm log={log} onSave={handleSave} isLoading={isLoading} />;
};

export default EditLog;
