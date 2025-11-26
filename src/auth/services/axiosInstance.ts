import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "@/app/store";
import { setCredentials, logout } from "../store/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        const refresh = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true });
        store.dispatch(setCredentials({ accessToken: refresh.data.accessToken, user: refresh.data.user }));
        originalRequest.headers.Authorization = `Bearer ${refresh.data.accessToken}`;
        return api(originalRequest);
      } catch (e) {
        store.dispatch(logout());
        // optionally: redirect to /login here if you have access to router
      }
    }
    return Promise.reject(error);
  }
);

export default api;
