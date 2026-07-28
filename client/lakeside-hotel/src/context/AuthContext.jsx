import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({
    user: null,
    handleLogin: () => {},
    handleLogout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
                    localStorage.clear();
                    setUser(null);
                    return;
                }
                const roles = decodedToken.roles && decodedToken.roles.length > 0
                    ? decodedToken.roles
                    : JSON.parse(localStorage.getItem("userRoles") || "[]");

                setUser({
                    sub: decodedToken.sub,
                    roles: roles,
                    id: decodedToken.sub,
                    token: token
                });
            } catch (error) {
                localStorage.clear();
                setUser(null);
            }
        }
    }, []);

    const handleLogin = (token, responseRoles) => {
        try {
            const decodedToken = jwtDecode(token);
            localStorage.setItem("token", token);
            localStorage.setItem("userId", decodedToken.sub);
            const roles = (decodedToken.roles && decodedToken.roles.length > 0)
                ? decodedToken.roles
                : (responseRoles || []);
            localStorage.setItem("userRoles", JSON.stringify(roles));

            setUser({
                sub: decodedToken.sub,
                roles: roles,
                id: decodedToken.sub,
                token: token
            });
        } catch (err) {
            console.error("Failed to decode token on login:", err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
