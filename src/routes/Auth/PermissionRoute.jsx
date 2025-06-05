import { useUser } from "@/context/auth";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import PageNotFound from "@/NotFound/PageNotFound";
import { userItems } from "./routes/user";
import { resellerItems } from "./routes/reseller";
import { it } from "date-fns/locale";

export const PermissionRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  const menuItems = resellerItems;

  const currentPath = location.pathname;

  const getPrivateRoute = (menuItems, userState) => {
    // if (userState.role === "AGENT") {
    //   return [
    //     { name: "Home", links: "/", roles: ["ADMIN"] },
    //     { name: "WhatsApp Live Chat", links: "/wlivechat" },
    //     { name: "WhatsApp Live Chat", links: ["/profile"] },
    //   ];
    // }
    // if (userState.role === "ADMIN") {
    //   return menuItems;
    // }

    // const alwaysIncludeNames = [
    //   "Home",
    //   "apiDocs",
    //   "CallBack",
    //   "Manage Contacts",
    //   "openRoutes",
    // ];

    const allowedServices = [];
    const data = {
      name: "Reports",
      links: [],
    };
    menuItems.map((item) => {
      userState.services.forEach((service) => {
        if (item.name === "Reports") {
          const links = item.links.filter(
            (link) => link.id == service.service_type_id
          );
          data?.links?.push(...links[0].links);
        }
      });

      allowedServices.push(item);
    });

    const filteredData = allowedServices.filter(
      (item) => item.name !== "Reports"
    );
    filteredData.push(data);

    return filteredData;
  };

  const privateRoute = getPrivateRoute(menuItems, user);

  if (!privateRoute.some((item) => item?.links.includes(currentPath)))
    return <PageNotFound />;
  return <Outlet />;
};
