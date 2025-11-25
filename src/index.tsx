import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* ✅ Mantine UI context */}
    <MantineProvider>
      {/* ✅ Notification system mounted at top-level */}
      <Notifications position="top-right" zIndex={9999} />
      <App />
    </MantineProvider>
  </React.StrictMode>
);

reportWebVitals();
