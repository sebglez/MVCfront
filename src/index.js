import ReactDOM from "react-dom/client";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { App } from "./App";
import { ContextProvider } from "./context/itemContext";
import { AuthProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ContextProvider>
);
