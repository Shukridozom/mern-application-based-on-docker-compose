import { createContext, useContext } from "react";

interface AuthContestType {
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
}

export const AuthContext = createContext<AuthContestType>({username: null, token: null, login: () => {}});

export const useAuth = () => useContext(AuthContext);