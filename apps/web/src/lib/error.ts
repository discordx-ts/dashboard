import { AxiosError } from "axios";

function errorToString(error: any, message = "Something went wrong") {
  // Check if the error is an AxiosError
  if (error instanceof AxiosError) {
    // Handle AxiosError
    if (error.response) {
      // Error response from server
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const serverMessage: string | undefined = error.response.data?.message;
      return serverMessage ?? error.response.statusText;
    } else if (error.request) {
      // Request made, but no response received
      return "No response received from server";
    } else {
      // Something happened during setup of the request
      return error.message;
    }
  }

  // Check if it's a generic JavaScript Error
  if (error instanceof Error) {
    return error.message;
  }

  // Default fallback error message
  return message;
}

export default errorToString;
