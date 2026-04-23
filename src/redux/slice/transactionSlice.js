import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    pendingTransaction: null,
  },
  reducers: {
    setPendingTransaction: (state, action) => {
      state.pendingTransaction = action.payload;
    },
    clearPendingTransaction: (state) => {
      state.pendingTransaction = null;
    },
  },
});

export const { setPendingTransaction, clearPendingTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;