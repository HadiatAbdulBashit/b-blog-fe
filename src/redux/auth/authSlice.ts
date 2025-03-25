import axiosInstance from "@/apis/axiosInstance";
import { Author } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const getInitialState = async () => {
  let isTokenAvailable = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!isTokenAvailable) return { user: {}, isAuthenticated: false };

  try {
    const { data }: { data: Author } = await axiosInstance.post("/my-info");
    return { user: data, isAuthenticated: true };
  } catch (error) {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.error("Session Expired");
    return { user: {}, isAuthenticated: false };
  }
};

let initialState = await getInitialState();

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialState?.user,
    isAuthenticated: initialState?.isAuthenticated,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthenticated, logout, setUser } = counterSlice.actions;

const { reducer: authReducer } = counterSlice;

export default authReducer;
