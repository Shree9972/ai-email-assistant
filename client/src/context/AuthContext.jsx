import { createContext } from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const checkAuth = async () => {

        try 
        {
            const response = await api.get("/auth/me");
            setUser(response.data.user);

        } 
        catch (error) 
        {
            setUser(null);
        }
        
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (

        <AuthContext.Provider value={{ user, setUser , checkAuth }}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthContext;