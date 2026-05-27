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

// export const authPersistConfig = {
//   key: "authSession",
//   storage,
//   whitelist: ["currentUser", "isAuthenticated"],
// };

// export const registerPersistConfig = {
//   key: "registerSession",
//   storage,
//   whitelist: ["users"],
// };
export const authPersistConfig = {
  key: "authSession",
  storage,
  whitelist: ["token", "hasPin", "isAuthenticated"],
};
export const transactionPersistConfig = {
  key: "transactionSession",
  storage,
  whitelist: ["transactions", "pendingTransaction"], 
};

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
//   register: persistReducer(registerPersistConfig, registerReducer),
//   transaction: persistReducer(transactionPersistConfig, transactionReducer),
// });
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSliceReducer),
  register: registerSliceReducer,
  transaction: persistReducer(transactionPersistConfig, transactionReducer),
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
