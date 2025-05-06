import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/auth";

export const useTTLMonitor = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const { user } = useUser();
            const ttl = user.ttl;
            const now = Date.now() + 3600 * 1000;

            if (ttl && now > parseInt(ttl)) {
                clearInterval(interval);
                localStorage.removeItem("ttl");
                navigate("/login");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);
};