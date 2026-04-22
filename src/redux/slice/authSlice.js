import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateCurrentUserInfo: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    }
  },
});

export const { loginSuccess, loginFailed, logoutUser, updateCurrentUserInfo } = authSlice.actions;
export default authSlice.reducer;