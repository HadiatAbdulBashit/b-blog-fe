import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  let loggedInUserId = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!loggedInUserId) return { user: null, isAuthenticated: false };

  loggedInUserId = loggedInUserId.trim();
};

let initialState = getInitialState();

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialState?.user || {},
    isAuthenticated: initialState?.isAuthenticated || false,
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
