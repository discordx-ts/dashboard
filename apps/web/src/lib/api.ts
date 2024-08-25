import axios, { AxiosError } from "axios";
import { toast } from "sonner";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw Error("env NEXT_PUBLIC_API_BASE_URL is required");
}

const BASE_API_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_API_ENDPOINT,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }
  return config;
});

type ApiError = AxiosError<{ message?: string | string[] }>;

function handleApiError(err: any) {
  const error = err as ApiError;
  console.log(error);
  let message = error.response?.data.message ?? "Something went wrong!";
  if (Array.isArray(message)) {
    message = message.join(". ");
  }
  toast.error(message);
}

export { BASE_API_ENDPOINT, api, handleApiError };
