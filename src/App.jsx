import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Approutes from "./routes/Approutes/Approutes";
import GlobalToaster from "./components/GlobalToaster";
import Apiroutes from "./routes/Apiroutes/Apiroutes";
import Login from "./login/Login";
import PrivateRoute from "./routes/Auth/PrivateRoute";
import AuthRoute from "./routes/Auth/AuthRoute";
import PageNotFound from "./NotFound/PageNotFound";
import LoadingBar from "./utils/LoadingBar";
import BeforeUnloadWarning from "./utils/BeforeUnloadWarning";
import { PermissionRoute } from "./routes/Auth/PermissionRoute";

const App = () => {
  return (
    <Router>
      {/* Site Warning when leave or reload */}
      {/* <BeforeUnloadWarning /> */}

      {/* Toaster */}
      <GlobalToaster />

      {/* Loading Top Progress Bar */}
      <LoadingBar />

      <Routes>
        <Route path="/*" element={<Approutes />} />
          <Route path="/docs/*" element={<Apiroutes />} />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        <Route element={<PrivateRoute />}>
          {/* <Route path="/*" element={<Approutes />} />
          <Route path="/docs/*" element={<Apiroutes />} /> */}

          <Route element={<PermissionRoute />}>
            <Route path="/*" element={<Approutes />} />
            <Route path="/docs/*" element={<Apiroutes />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>

    // <Router>
    //   <GlobalToaster />
    //   <Routes>
    //     {/* <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} /> */}
    //     <Route path="/login" element={<Login />} />

    //     {/* Temporarily remove PrivateRoute to allow direct access */}
    //     <Route path="/*" element={<Approutes />} />
    //     <Route path="/docs/*" element={<Apiroutes />} />

    //     <Route path="*" element={
    //       <div className='flex items-center justify-center min-h-[100vh]'>
    //         <span className="text-3xl text-gray-700 font-semibold">
    //           404 Not Found
    //         </span>
    //       </div>
    //     }
    //     />
    //   </Routes>
    // </Router>
  );
};

export default App;
