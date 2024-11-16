import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, inputs, { withCredentials: true });
            if (res.data && !res.data.fatal) {
                setCurrentUser(res.data);
                return null;
            } else {
                console.error("Unexpected response:", res.data);
                return {error: res.data};
            }
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
            return { error: error.response ? error.response.data : error.message };
        }
    };

    const logout = async () => {
        await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
        setCurrentUser(null)
        
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}