import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // null=loading, false=anon, obj=auth
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("/users/me")
                .then((res) => {
                    if (res.data.success) {
                        setUser(res.data.data);
                    } else {
                        setUser(false);
                    }
                })
                .catch(() => {
                    setUser(false);
                    localStorage.removeItem('token');
                })
                .finally(() => setLoading(false));
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        if (data.success) {
            localStorage.setItem('token', data.data.accessToken);
            setUser(data.data.user);
            return data.data.user;
        }
        throw new Error(data.message || "Login failed");
    };

    const register = async (payload) => {
        const { data } = await api.post("/auth/register", payload);
        if (data.success) {
            localStorage.setItem('token', data.data.accessToken);
            setUser(data.data.user);
            return data.data.user;
        }
        throw new Error(data.message || "Registration failed");
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } finally {
            localStorage.removeItem('token');
            setUser(false);
        }
    };

    const refresh = async () => {
        const { data } = await api.get("/users/me");
        if (data.success) {
            setUser(data.data);
            return data.data;
        }
        return null;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refresh, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
