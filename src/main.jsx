import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./router/AppRoute.jsx";
import "./Global.css";
// import App from './App.jsx'
// import Login from './pages/Login.jsx'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  // </StrictMode>
);
