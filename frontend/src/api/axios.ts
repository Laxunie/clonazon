import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // 👈 needed so cookies (refresh token) are sent
});

// Store access token in memory (not localStorage for security)
let accessToken: string | null = null;

// Setter for login flow
export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Add token to every request
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired token automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 & not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh endpoint
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true } // 👈 send refresh cookie
        );

        const newToken = res.data.accessToken;
        setAccessToken(newToken);

        // retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token invalid/expired", refreshError);
        // optional: logout user here
      }
    }

    return Promise.reject(error);
  }
);

export default api;