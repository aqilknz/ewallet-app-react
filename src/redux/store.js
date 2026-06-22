import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import authSliceReducer from "./slice/authUserSlice"
import transactionUserReducer from "./slice/transactionUserSlice";

export const authPersistConfig = {
  key: "authSession",
  storage,
  whitelist: ["token", "hasPin", "isAuthenticated", "currentUser"],
};
export const transactionPersistConfig = {
  key: "transactionSession",
  storage,
  whitelist: ["pendingTransaction"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSliceReducer),
  transaction: persistReducer(transactionPersistConfig, transactionReducer),
  dashboard: transactionUserReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
