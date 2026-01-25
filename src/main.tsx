import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Webrtc } from "./webrtc/webrtc.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Webrtc />
    {/* <App /> */}
  </StrictMode>,
);
