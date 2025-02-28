import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Approutes from './routes/Approutes/Approutes'
import GlobalToaster from './components/GlobalToaster'
import Apiroutes from './routes/Apiroutes/Apiroutes'
import Login from './login/Login';
import PrivateRoute from './routes/Auth/PrivateRoute';
import AuthRoute from './routes/Auth/AuthRoute';

const App = () => {
  return (
    <Router>
      <GlobalToaster />
      <Routes>
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />

        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<Approutes />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/apiDocs/*" element={<Apiroutes />} />
        </Route>


        <Route path="*" element={
          <div className='flex items-center justify-center min-h-[100vh]'>
            <span className="text-3xl text-gray-700 font-semibold">
              404 Not Found
            </span>
          </div>
        }
        />
      </Routes>
    </Router>
    // <Router>
    //   <GlobalToaster />
    //   <Routes>
    //     {/* <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} /> */}
    //     <Route path="/login" element={<Login />} />

    //     {/* Temporarily remove PrivateRoute to allow direct access */}
    //     <Route path="/*" element={<Approutes />} />
    //     <Route path="/*" element={<Apiroutes />} />

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
  )
}

export default App