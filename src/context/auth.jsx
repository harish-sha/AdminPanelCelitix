import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        role: "",
        services: [],
        ttl: 0,
    });

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (e) {
                console.error("Failed to parse user from sessionStorage", e);
            }
        } else {
            setUser({
                isAuthenticated: false,
                role: "",
                services: [],
                ttl: 0,
            });
        }
    }, []);

    const authLogin = (role, services = [], ttl) => {
        setUser({
            isAuthenticated: true,
            role,
            services,
            ttl,
        });
        sessionStorage.setItem(
            "user",
            JSON.stringify({
                isAuthenticated: true,
                role,
                services,
                ttl,
            })
        );
    };

    const authLogout = () => {
        setUser({
            isAuthenticated: false,
            role: "",
            services: [],
            ttl: 0,
        });
        sessionStorage.removeItem("user");
    };

    const value = useMemo(() => ({ user, authLogin, authLogout }), [user]);

    return (
        <UserContext.Provider value={{ user, authLogin, authLogout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

