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
import { Provider } from "react-redux";
import store from "./whatsapp/whatsappFlows/redux/Store.js";
// import NetworkStatusProvider from "./context/NetworkStatusProvider.jsx";
import { WabaAgentProvider } from "./context/WabaAndAgent.jsx";
import { InstagramProvider } from "./context/InstagramContext.jsx";
import { MessangerProvider } from "./context/MessengerContext.jsx";
import { RcsProvider } from "./context/RcsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <PrimeReactProvider>
        {/* <ErrorBoundary> */}
        <DownloadProvider>
          <WabaAgentProvider>
            <InstagramProvider>
              <RcsProvider>
                <MessangerProvider>
                  <DndProvider backend={HTML5Backend}>
                    <Provider store={store}>
                      {/* <NetworkStatusProvider></NetworkStatusProvider> */}
                      <App />
                    </Provider>
                  </DndProvider>
                </MessangerProvider>
              </RcsProvider>
            </InstagramProvider>
          </WabaAgentProvider>
        </DownloadProvider>
        {/* </ErrorBoundary> */}
      </PrimeReactProvider>
    </UserProvider>
  </StrictMode>
);
