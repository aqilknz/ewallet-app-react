import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    pendingTransaction: null,
    transactions: [],
  },
  reducers: {
    setPendingTransaction: (state, action) => {
      state.pendingTransaction = action.payload;
    },
    clearPendingTransaction: (state) => {
      state.pendingTransaction = null;
    },
    addTransaction: (state, action) => {
      state.transactions.unshift({
        id: Date.now(),
        ...action.payload,
      });
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload,
      );
    },
  },
});

export const {
  setPendingTransaction,
  clearPendingTransaction,
  addTransaction,
  deleteTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
