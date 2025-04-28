import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Prime React */}
    <PrimeReactProvider>
      {/* Error Boundary*/}
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </PrimeReactProvider>
  </StrictMode>
);
