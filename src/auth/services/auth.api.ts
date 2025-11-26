import api from "./axiosInstance";
import { setCredentials } from "../store/authSlice";
import { AppDispatch } from "@/app/store";

export const loginService = async (credentials: { email: string; password: string }, dispatch: AppDispatch) => {
  const res = await api.post("/auth/login", credentials);
  dispatch(setCredentials({ accessToken: res.data.accessToken, user: res.data.user }));
  return res.data;
};
