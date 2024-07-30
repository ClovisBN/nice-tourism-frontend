import React from "react";
import ReactDOM from "react-dom/client";
import WrappedApp from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);
