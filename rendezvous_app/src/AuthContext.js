import React, { createContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from './/Pages//token';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        saveToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeToken();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };