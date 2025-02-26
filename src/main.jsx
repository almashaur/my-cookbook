import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Recommended for DOM-based routing
import "bootstrap/dist/css/bootstrap.min.css";

import { UserProvider } from "./context/UserContext.jsx";
import App from "./App.jsx";

// Get the root element and ensure it exists
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

// Create the React root and render the app
createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
