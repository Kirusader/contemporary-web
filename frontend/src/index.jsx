/** @format */

// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Reducer.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
