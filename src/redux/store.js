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
import authReducer from "./slice/authSlice";
import registerReducer from "./slice/registerSlice";
import transactionReducer from "./slice/transactionSlice"

export const authPersistConfig = {
    key: "authSession",
    storage,
    whitelist: ['currentUser', 'isAuthenticated'] 
};

export const registerPersistConfig = {
    key: "registerSession",
    storage,
    whitelist: ['users'] 
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  register: persistReducer(registerPersistConfig, registerReducer),
  transaction: transactionReducer,
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