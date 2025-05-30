import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./utils/AuthContext";
import { BrowserRouter } from "react-router-dom";

 document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ['I', 'C', 'J', 'K'].includes(e.key)) ||
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
    alert("Nu poți ajunge chiar așa ușor acolo:)");
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
