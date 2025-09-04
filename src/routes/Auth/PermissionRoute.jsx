import { useUser } from "@/context/auth";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import PageNotFound from "@/NotFound/PageNotFound";
import { userItems } from "./routes/user";
import { resellerItems } from "./routes/reseller";
import Loader from "@/whatsapp/components/Loader";
import { useMemo } from "react";

// export const PermissionRoute = ({ children }) => {
//   const { user, isLoading } = useUser();
//   const location = useLocation();

//   const menuItems = user?.role === "RESELLERUSER" ? userItems : resellerItems;

//   const currentPath = location.pathname;

//   const getPrivateRoute = (menuItems, userState) => {
//     if (userState.role === "AGENT") {
//       return [
//         { name: "Home", links: "/", roles: ["ADMIN"] },
//         { name: "WhatsApp Live Chat", links: "/wlivechat" },
//         { name: "WhatsApp Live Chat", links: ["/profile"] },
//       ];
//     }
//     if (userState.role === "RESELLER") {
//       return menuItems;
//     }

//     const alwaysIncludeNames = [
//       "Home",
//       "apiDocs",
//       "CallBack",
//       "Manage Contacts",
//       "openRoutes",
//       "WorkFlow",
//     ];

//     const allowedServices = [];
//     menuItems.map((item) => {
//       if (alwaysIncludeNames.includes(item.name)) {
//         allowedServices.push(item);
//         return;
//       }

//       userState.services.forEach((service, index) => {
//         if (item.name == service.display_name) {
//           allowedServices.push(item);
//           // return item
//         }
//       });
//     });

//     return allowedServices;
//   };

//   if (!user || isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader />
//       </div>
//     );
//   }

//   const privateRoute = getPrivateRoute(menuItems, user);

//   if (!privateRoute.some((item) => item?.links?.includes(currentPath)))
//     return <PageNotFound />;
//   return <Outlet />;
// };

export const PermissionRoute = ({ children }) => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = useMemo(() => {
    return user?.role === "RESELLERUSER" ? userItems : resellerItems;
  }, [user]);

  const privateRoutes = useMemo(() => {
    if (!user) return [];

    if (user.role === "RESELLER") {
      return menuItems;
    }

    if (user.role === "AGENT") {
      return [
        { name: "Home", links: "/", roles: ["ADMIN"] },
        { name: "WhatsApp Live Chat", links: "/wlivechat" },
        { name: "WhatsApp Live Chat", links: ["/profile"] },
      ];
    }

    const alwaysInclude = [
      "Home",
      "apiDocs",
      "CallBack",
      "Manage Contacts",
      "openRoutes",
      "WorkFlow",
      "chatManagement",
      "Number Lookup" // - later remove this number lookup according to service id
    ];

    return menuItems.filter(
      (item) =>
        alwaysInclude.includes(item.name) ||
        user.services.some((service) => service.display_name == item.name)
    );
  }, [user, menuItems]);

  const isPathAllowed = useMemo(() => {
    return privateRoutes.some((item) =>
      Array.isArray(item.links)
        ? item.links.includes(currentPath)
        : item.links === currentPath
    );
  }, [privateRoutes, currentPath]);


  if (isLoading || !user)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!isPathAllowed) return <PageNotFound />;

  return <Outlet />;
};
