import { jwtDecode } from "jwt-decode";

import { Register } from "@/types";
import axiosInstance from "./axiosInstance";
import store from "@/redux/store";
import { setAuthenticated } from "@/redux/auth/authSlice";
import { toast } from "sonner";

class AuthApi {
  static async login(email: string, password: string) {
    try {
      const { data } = await axiosInstance.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      store.dispatch(setAuthenticated(jwtDecode(data.token)));
    } catch (error: any) {
      throw new Error("AuthApi login: " + error.message);
    }
  }

  static async register(url: string, { arg }: { arg: Register }) {
    try {
      const { data } = await axiosInstance.post(url, { ...arg });
      toast.success(data.message);
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("AuthApi register: " + error);
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
      const token = localStorage.getItem("token");
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
