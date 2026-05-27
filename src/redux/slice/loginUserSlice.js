import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUserSlice = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || data.message || "Gagal login");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Terjadi kesalahan koneksi");
    }
  }
);
export const createPin = createAsyncThunk(
  "auth/createPin",
  async (pin, { getState, rejectWithValue }) => {
    try {

      const token = getState().auth.token;

      const response = await fetch(`${API_URL}/auth/create-pin`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ pin: pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || data.message || "Gagal membuat PIN");
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Terjadi kesalahan koneksi");
    }
  }
);

export const logoutUserSlice = createAsyncThunk(
  "auth/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || data.message || "Gagal logout");
      }
      console.log("ISI DATA DARI GOLANG:", data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Terjadi kesalahan koneksi");
    }
  }
);

const initialState = {
  token: null,
  hasPin: false,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthForce: (state) => {
      state.token = null;
      state.hasPin = false;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.hasPin = action.payload.has_pin;
        state.token = action.payload.token;
      })
      .addCase(loginUserSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      .addCase(logoutUserSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserSlice.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.hasPin = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutUserSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.hasPin = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

    //createPin
      .addCase(createPin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPin.fulfilled, (state) => {
        state.isLoading = false;
        state.hasPin = true; 
      })
      .addCase(createPin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      
  },
});

export const { clearAuthForce } = authSlice.actions;
export default authSlice.reducer;