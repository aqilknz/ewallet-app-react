import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const API_URL = import.meta.env.VITE_API_URL

export const registerUserSlice = createAsyncThunk(
  "register/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || data.message || "Gagal melakukan registrasi");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Terjadi kesalahan koneksi");
    }
  }
);

const initialState = {
  isSuccess: false,
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterStatus: (state) => {
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(registerUserSlice.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUserSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRegisterStatus } = registerSlice.actions;
export default registerSlice.reducer;