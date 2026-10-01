import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserPlatform, installPlatform } from "../src";
import { App } from "./app";
import { hostSession } from "./host";
import "./index.css";

installPlatform(createBrowserPlatform(hostSession));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
