import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isSuccess: false,
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.isSuccess = false;
    },

    registerSuccess: (state, action) => {
      const newUser = {
        ...action.payload,
        username: action.payload.username || action.payload.email,
        pin: null,
        fullName: action.payload.fullName || "User",
        phone: action.payload.phone || "-",
        avatar: null,
        balance: 0,
        income: 0,
        expense: 0,
      };
      state.users.push(newUser);
      state.isLoading = false;
      state.isSuccess = true;
    },

    registerFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // f. Update pin dan password terhadap data user
    savePinToUser: (state, action) => {
      const { username, pin } = action.payload;
      const user = state.users.find((u) => u.username === username || u.email === username);
      if (user) {
        user.pin = pin;
      }
    },

    // f. Update profile data (email, phone, fullName, password)
    updateUserProfile: (state, action) => {
      const { username, ...updates } = action.payload;
      const index = state.users.findIndex((u) => u.username === username || u.email === username);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updates };
      }
    },

    // v. Penyesuaian saldo (Topup & Transfer)
    updateUserBalance: (state, action) => {
      const { username, amount, type } = action.payload; 
      const user = state.users.find((u) => u.username === username || u.email === username);
      
      if (user) {
        if (type === 'topup') {
          user.balance += Number(amount);
          user.income += Number(amount); // Track pemasukan
        } else if (type === 'transfer') {
          user.balance -= Number(amount);
          user.expense += Number(amount); // Track pengeluaran
        }
      }
    },

    resetRegisterStatus: (state) => {
      state.isSuccess = false;
      state.error = null;
    }
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailed,
  savePinToUser,
  updateUserProfile,
  updateUserBalance,
  resetRegisterStatus
} = registerSlice.actions;

export default registerSlice.reducer;