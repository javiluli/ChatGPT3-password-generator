import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { MaterialUIProvider } from "./context";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MaterialUIProvider>
      <CssBaseline />
      <App />
    </MaterialUIProvider>
  </React.StrictMode>
);
