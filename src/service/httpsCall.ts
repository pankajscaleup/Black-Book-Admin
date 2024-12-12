import axios from "axios";
import toast from "react-hot-toast";

// Request Interceptor
axios.interceptors.request.use(async (config) => {
  config.baseURL = import.meta.env.VITE_API_BASE_URL;

  // Get the access token and refresh token from localStorage
  const token = localStorage.getItem("access_token") ?? "";

  // If access token is available, add it to the request header
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  } else if (axios.defaults.headers.common["authorization"]) {
    config.headers["authorization"] = axios.defaults.headers.common["authorization"];
  }
  return config;
});

// Response Interceptor
axios.interceptors.response.use(
  async (response) => {
    return response; // Return the response if no error
  },
  async (error) => {

    // Check if the error is due to an expired access token
    const expectedErrorRefreshToken =
      error.response && error.response.status === 500;

    if (expectedErrorRefreshToken) {
      // Get the refresh token from localStorage
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          // Attempt to refresh the access token by sending the refresh token
          const refreshResponse = await axios.post("admin/refresh-tokens", { token: refreshToken });
          
          // If the refresh token is valid and you get a new access token
          if (
            refreshResponse &&
            refreshResponse.data &&
            refreshResponse.data.tokens
          ) {
            const newAccessToken = refreshResponse.data.tokens.access;
            const newRefreshToken = refreshResponse.data.tokens.refresh;

            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("refresh_token", newRefreshToken);

            // Retry the original request with the new access token
            error.config.headers["access"] = newAccessToken;
            return axios(error.config); // Retry the original request with new token
          }
        } catch (refreshError) {
          // Handle errors that occur during refresh token process
          console.error("Refresh token error:", refreshError);
          toast.error("Session expired. Please login again.");
          // Redirect user to login page or perform other error handling
        }
      } else {
        // Handle the case where no refresh token is available
        toast.error("No refresh token found. Please login again.");
      }
    }
    toast.error(error.response?.data?.message || "Something went wrong.");
    return Promise.reject(error);
  }
);

// Exporting axios call methods
const httpsCall = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  interceptors: axios.interceptors,
};

export default httpsCall;
