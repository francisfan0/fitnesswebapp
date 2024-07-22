import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { LogType, ProfileType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyProfile = async (profileFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    credentials: "include",
    method: "POST",
    body: profileFormData,
  });

  if (!response.ok) {
    throw new Error("Error saving profile");
  }

  return response.json();
};

export const addLog = async (logFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-logs`, {
    credentials: "include",
    method: "POST",
    body: logFormData,
  });

  if (!response.ok) {
    throw new Error("Error saving log");
  }

  return response.json();
};

export const fetchMyLogs = async (): Promise<LogType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-logs`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching logs");
  }

  return response.json();
};

export const fetchMyProfile = async (): Promise<ProfileType> => {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching profile");
  }

  return response.json();
};

export const updateMyProfile = async (profileFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    body: profileFormData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};

export const fetchMyLogById = async (logId: string): Promise<LogType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-logs/${logId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching logs");
  }

  return response.json();
};

export const updateMyLogById = async (logFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-logs/${logFormData.get("logId")}`,
    {
      method: "PUT",
      body: logFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update log");
  }

  return response.json();
};

export const addMyChatRequest = async (chatFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-chat`, {
    credentials: "include",
    method: "POST",
    body: chatFormData,
  });

  if (!response.ok) {
    throw new Error("Error fetching chat");
  }

  return response.json();
};
