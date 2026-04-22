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
    pendingTransaction: (state) => {
      state.pendingTransaction = null;
    },
  },
});

export const { setPendingTransaction, pendingTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;