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
import storage from "redux-persist/es/storage"; // Import yang lebih standar
import authReducer from "./slice/authSlice";
import registerReducer from "./slice/registerSlice";
import transactionReducer from "./slice/transactionSlice"

// Konfigurasi untuk Sesi Login (Sangat penting agar user tidak perlu login ulang)
export const authPersistConfig = {
    key: "authSession",
    storage,
    whitelist: ['currentUser', 'isAuthenticated'] // Hanya simpan data login utama
};

// Konfigurasi untuk Database User (Poin a.i: List akun yang didaftarkan)
export const registerPersistConfig = {
    key: "registerSession",
    storage,
    whitelist: ['users'] // HANYA simpan daftar users, abaikan error/loading
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
        // Abaikan pengecekan serializable untuk action bawaan redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);