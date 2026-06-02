import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, logoutAPI, createPinAPI, getProfileAPI, updateProfileAPI, updatePasswordAPI, updatePinAPI } from "../../services/apiServices";

export const loginUserSlice = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginAPI(credentials);
      return data;
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
      const data = await createPinAPI(pin, token);
      return data;
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
      const data = await logoutAPI(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Terjadi kesalahan koneksi");
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) throw new Error("Sesi tidak valid");

      const data = await getProfileAPI(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Terjadi kesalahan koneksi");
    }
  }
);
export const editUserProfile = createAsyncThunk(
  "auth/editUserProfile",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await updateProfileAPI(formData, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateUserPassword = createAsyncThunk(
  "auth/updatePassword",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await updatePasswordAPI(payload, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateUserPin = createAsyncThunk(
  "auth/updatePin",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await updatePinAPI(payload, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  hasPin: false,
  isAuthenticated: false,
  currentUser: null,
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
      // Login
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

      // Logout
      .addCase(logoutUserSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserSlice.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.hasPin = false;
        state.isAuthenticated = false;
        state.currentUser = null; // Hapus profil saat logout
      })
      .addCase(logoutUserSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.hasPin = false;
        state.isAuthenticated = false;
        state.currentUser = null; // Tetap hapus profil meski request gagal
        state.error = action.payload;
      })

      // Create PIN
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
      })

      // Fetch Profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload; // Simpan data dari Golang ke state
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(editUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // change password
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // changle pin
      .addCase(updateUserPin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserPin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserPin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthForce } = authSlice.actions;
export default authSlice.reducer;