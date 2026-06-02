import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDashboardAPI,
  processTopUpAPI,
  getTransactionHistoryAPI,
  processTransferAPI,
  searchUsersAPI,
  getTransactionReportAPI
} from "../../services/apiServices";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await getDashboardAPI(token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchTransactionReport = createAsyncThunk(
  "dashboard/fetchReport",
  async (params, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await getTransactionReportAPI(token, params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const processTopUp = createAsyncThunk(
  "dashboard/topUp",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await processTopUpAPI(payload, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const processTransfer = createAsyncThunk(
  "dashboard/transfer",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await processTransferAPI(payload, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransactionHistory = createAsyncThunk(
  "dashboard/fetchHistory",
  async (params, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await getTransactionHistoryAPI(token, params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransferTargets = createAsyncThunk(
  "dashboard/fetchTransferTargets",
  async (params, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const data = await searchUsersAPI(token, params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const transactionUserSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: { balance: 0, income: 0, expense: 0 },
    recentTransactions: [],
    historyMeta: null,
    transferTargets: [],
    transferMeta: null,
    chartData: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(processTopUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(processTopUp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(processTopUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(processTransfer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(processTransfer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(processTransfer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTransactionReport.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTransactionReport.fulfilled, (state, action) => {
        state.chartData = action.payload || [];
      })
      .addCase(fetchTransactionReport.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.recentTransactions = action.payload.transactions || [];
        state.historyMeta = action.payload.meta || null;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTransferTargets.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload.receivers)) {
          state.transferTargets = action.payload.receivers;
          state.transferMeta = action.payload.meta || null;
        } else if (Array.isArray(action.payload)) {
          state.transferTargets = action.payload;
          state.transferMeta = null;
        } else {
          state.transferTargets = [];
          state.transferMeta = null;
        }
      });
  },
});

export default transactionUserSlice.reducer;