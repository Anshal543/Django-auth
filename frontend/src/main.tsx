import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import "./interceptors/axios.ts";
import { store } from "./redux/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
   </StrictMode>
);
