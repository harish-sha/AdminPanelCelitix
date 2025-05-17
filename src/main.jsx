import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import { UserProvider } from "./context/auth";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DownloadProvider } from "./context/DownloadProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* User Context */}
    <UserProvider>
      {/* Prime React */}
      <PrimeReactProvider>
        {/* Error Boundary*/}
        <ErrorBoundary>
          <DownloadProvider>
            <DndProvider backend={HTML5Backend}>
              <App />
            </DndProvider>
          </DownloadProvider>
        </ErrorBoundary>
      </PrimeReactProvider>
    </UserProvider>
  </StrictMode>
);
