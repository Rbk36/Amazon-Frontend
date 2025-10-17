import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route } from "react-router";
import DataProvider from "./components/DataProvider/DataProvider.jsx";
import { initialState, reducer } from "./utils/reducer.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider initialState={{ basket: [] }} reducer={reducer}>
        <App />
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
);
