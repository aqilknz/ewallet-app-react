import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage"
import userReducer from "./slice/authSlice"

const persistConfig ={
    key: "userAcc",
    storage,
}
const persistedReducer = persistReducer(persistConfig,  userReducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer
    },
    
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
})

export const persistor = persistStore(store)

