import { useUser } from "@/context/auth";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import PageNotFound from "@/NotFound/PageNotFound";
import { userItems } from "./routes/user";
import { resellerItems } from "./routes/reseller";

export const PermissionRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  const menuItems = user?.role === "RESELLERUSER" ? userItems : resellerItems;

  const currentPath = location.pathname;

  const getPrivateRoute = (menuItems, userState) => {
    if (userState.role === "RESELLER") {
      return menuItems;
    }

    const alwaysIncludeNames = [
      "Home",
      "apiDocs",
      "CallBack",
      "Managecontacts",
    ];

    const allowedServices = menuItems.map((item) => {
      if (alwaysIncludeNames.includes(item.name)) {
        return item;
      }

      userState.services.forEach((service, index) => {
        if (item.name == service.display_name) {
          return item
        }
      });
    });

    return allowedServices;
  };

  const privateRoute = getPrivateRoute(menuItems, user);

  if (!privateRoute.some((item) => item?.links?.includes(currentPath)))
    return <PageNotFound />;
  return <Outlet />;
};
