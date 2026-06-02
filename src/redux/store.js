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
// import authReducer from "./slice/authSlice";
// import registerReducer from "./slice/registerSlice";
import transactionReducer from "./slice/transactionSlice";
import authSliceReducer from "./slice/loginUserSlice"
import registerSliceReducer from "./slice/registerUserSlice"
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
  register: registerSliceReducer,
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
