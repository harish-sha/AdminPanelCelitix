import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import nprogress styles

NProgress.configure({ showSpinner: false }); // Optional: hide spinner

function LoadingBar() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);

  return null;
}

export default LoadingBar;
