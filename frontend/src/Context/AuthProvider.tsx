import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./Auth/AuthContext";

const USERNAME_KEY = 'username';
const TOEKN_KEY = 'token';

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [username, setUserName] = useState<string | null>(localStorage.getItem('username'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const isAuthenticated = !!token;

    const login = (username: string, token: string) => {
        setUserName(username);
        setToken(token);
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(TOEKN_KEY, token);
    }
    
    const logout = () => {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOEKN_KEY);
        setUserName(null);
        setToken(null);
    }


    return (
        <AuthContext.Provider value={{username, token, isAuthenticated, login, logout}}>
            {children}
        </ AuthContext.Provider>
    )

}


export default AuthProvider;