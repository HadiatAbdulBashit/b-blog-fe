import { jwtDecode } from "jwt-decode";

import { Login, Register } from "@/types";
import axiosInstance from "./axiosInstance";
import store from "@/redux/store";
import { setAuthenticated } from "@/redux/auth/authSlice";
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
      localStorage.removeItem("token");
    } catch (error: any) {
      throw new Error("AuthApi logout: " + error.message);
    }
  }

  static async getUser() {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.user;
      }
    } catch (error: any) {
      throw new Error("AuthApi getUser: " + error.message);
    }
  }
}

export default AuthApi;
