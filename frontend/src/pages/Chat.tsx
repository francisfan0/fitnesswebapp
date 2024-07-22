import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LogFormData } from "../forms/ManageLogForm/ManageLogForm";
import dayjs from "dayjs";

export type ChatFormData = {
  logId: string;
  additionalInput: string;
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<
    { text: string; type: "sent" | "received" }[]
  >([]);
  const [, setResponseMessage] = useState<string | null>(null);
  const { mutate, isLoading } = useMutation(apiClient.addMyChatRequest, {
    onSuccess: (data) => {
      setResponseMessage(data.message); // Update state with the response from server
      // Add AI response to chat messages
      setChatMessages((prev) => [
        ...prev,
        { text: data.message, type: "received" },
      ]);
    },
    onError: () => {
      setResponseMessage("An error occurred while processing your request.");
    },
  });

  const handleSave = (chatFormData: FormData) => {
    console.log("Sending data to API:", chatFormData); // Debug log
    mutate(chatFormData);
  };

  const formMethods = useForm<ChatFormData>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formMethods;

  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const { data: logData, error } = useQuery<LogFormData[]>(
    "fetchMyLogs",
    apiClient.fetchMyLogs,
    {
      onError: () => {},
    }
  );

  const handleLogClick = (logId: string) => {
    setValue("logId", logId);
    setSelectedLogId(logId); // Update the selected log ID
  };

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  const onSubmit = handleSubmit((formDataJson: ChatFormData) => {
    const formData = new FormData();
    formData.append("logId", formDataJson.logId);
    formData.append("additionalInput", formDataJson.additionalInput);
    const currentDate = new Date();
    formData.append("lastRequestDate", currentDate.toString());

    // Add user input to chat history as a single message
    setChatMessages((prev) => [
      ...prev,
      { text: formDataJson.additionalInput, type: "sent" },
    ]);

    handleSave(formData); // Handle saving the form data
  });

  return (
    <div className="chat-container">
      <FormProvider {...formMethods}>
        <div className="flex flex-col h-screen max-h-screen">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            <div className="chat-container">
              <h3 className="chat-bubble chat-bubble-received">
                Welcome to your personal AI-powered trainer!
              </h3>
              <h3 className="chat-bubble chat-bubble-received">
                Select a log to ask advice on:
              </h3>
              {!logData || logData.length === 0 ? (
                <div className="chat-bubble chat-bubble-received">
                  Please add a log to utilize this feature.
                </div>
              ) : (
                logData.map((log) => (
                  <div
                    key={log._id}
                    className={`chat-bubble ${
                      log._id === selectedLogId
                        ? "chat-bubble-selected"
                        : "chat-bubble-sent"
                    }`}
                    onClick={() => handleLogClick(log._id)}
                  >
                    <div className="chat-bubble-content">
                      <h2 className="text-lg font-bold">
                        {dayjs(log.date).add(5, "hour").format("MMMM D, YYYY")}
                      </h2>
                      <p>Today was a {log.splitDay} day</p>
                      <div className="chat-info">
                        <div>{log.location}</div>
                        <div>{log.timeSpent} minutes spent</div>
                        <div>{log.exercises.length} exercises performed</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <h3 className="chat-bubble chat-bubble-received">
                Are there any additional qualifications you would like to add
                before asking your trainer?
              </h3>

              {/* Display chat messages */}
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${
                    message.type === "received"
                      ? "chat-bubble-received"
                      : "chat-bubble-sent"
                  }`}
                >
                  <div className="chat-bubble-content">
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form
            className="p-4 border-t bg-white flex flex-col gap-2"
            onSubmit={onSubmit}
          >
            <textarea
              className="border rounded-lg w-full p-2 resize-none"
              rows={3}
              placeholder="Type your message..."
              {...register("additionalInput")}
            />
            {errors.additionalInput && (
              <span className="text-red-500 text-sm">
                {errors.additionalInput.message}
              </span>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-500 text-xl disabled:bg-gray-400 transition duration-300"
            >
              {isLoading ? "Saving..." : "Send"}
            </button>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

// CSS Styles (Add to your global styles or as a CSS module)
const chatStyles = `
  .chat-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .chat-bubble {
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 16px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    margin-bottom: 10px;
  }
  .chat-bubble-received {
    align-self: flex-start;
    background-color: #f1f1f1;
  }
  .chat-bubble-sent {
    align-self: flex-end;
    background-color: #e0f7fa;
  }
  .chat-bubble-selected {
    align-self: flex-end;
    background-color: #d1e7ff;
    border: 2px solid #0056b3;
  }
  .chat-bubble-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .chat-info {
    display: flex;
    gap: 8px;
    font-size: 0.875rem;
    color: #555555;
  }
`;

const addGlobalStyles = () => {
  const style = document.createElement("style");
  style.innerHTML = chatStyles;
  document.head.appendChild(style);
};

addGlobalStyles();

const LoadingIndicator = () => (
  <div className="flex justify-center items-center h-full p-4">
    <span className="text-gray-700">Loading...</span>
  </div>
);

const ErrorIndicator = () => (
  <div className="flex justify-center items-center h-full p-4">
    <span className="text-red-500">Error loading logs</span>
  </div>
);

export default Chat;
