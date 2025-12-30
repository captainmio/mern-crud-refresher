import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    // add a generic error object to handle backend error
    const customError = {
      message: "An unexpected error occurred",
      status: error.response?.status,
      type: "UNKNOWN"
    };

   if (!error.response) {
    customError.message = "Server is unreachable. Please check your connection.";
    customError.type = "NETWORK_ERROR";
   }
    return Promise.reject(customError);
  }
);

export default api