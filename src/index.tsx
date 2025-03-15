import React from "react";
import ReactDOM from "react-dom/client";
import Calculator from "./components/Calculator";
import "./scss/style.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
