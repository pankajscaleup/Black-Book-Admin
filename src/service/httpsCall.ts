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
let retryCount = 0;
const MAX_RETRIES = 3;

axios.interceptors.response.use(
  async (response) => {
    return response; // Return the response if no error
  },
  async (error) => {
    const tokenExpired = error.response?.data?.tokenExpired || false;
    const isUnauthorized = error.response?.status === 401;

    if (tokenExpired && isUnauthorized && retryCount < MAX_RETRIES) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post("admin/refresh-tokens", {
            token: refreshToken,
          });

          const { access, refresh } = refreshResponse.data.tokens || {};
          if (access && refresh) {
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            
            // Update original request with new token
            error.config.headers["Authorization"] = `Bearer ${access}`;
            retryCount++;
            return axios(error.config); // Retry the original request
          }
        } catch (refreshError) {
          toast.error("Session expired. Please login again.");
          retryCount = 0; // Reset the count on failure
        }
      } else {
        toast.error("No refresh token found. Please login again.");
      }
    }

    toast.error(error.response?.data?.message || "Something went wrong.");
    retryCount = 0; // Reset the count on any other error
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
