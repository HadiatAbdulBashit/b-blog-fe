import { Login, Register } from "@/types";
import axiosInstance from "./axiosInstance";
import store from "@/redux/store";
import { logout, setAuthenticated } from "@/redux/auth/authSlice";
import { toast } from "sonner";

class AuthApi {
  static async login(url: string, { arg }: { arg: Login }) {
    try {
      const { data } = await axiosInstance.post(url, { ...arg });

      arg.remember ? localStorage.setItem("token", data.token) : sessionStorage.setItem("token", data.token);
      store.dispatch(setAuthenticated(data.user));

      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("AuthApi login: " + error.response.data.error);
    }
  }

  static async register(url: string, { arg }: { arg: Register }) {
    try {
      const { data } = await axiosInstance.post(url, { ...arg });

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("AuthApi register: " + error.response.data.error);
    }
  }

  static async logout() {
    try {
      const { data } = await axiosInstance.post("/logout");
      store.dispatch(logout());
      toast.success(data.message);
    } catch (error: any) {
      throw new Error("AuthApi logout: " + error.response.data.error);
    }
  }

  static async getUser() {
    try {
      const { data } = await axiosInstance.post("/my-info");
      return data;
    } catch (error: any) {
      toast.error("Session Expired");
      throw new Error("AuthApi getUser: " + error.response.data.error);
    }
  }
}

export default AuthApi;
