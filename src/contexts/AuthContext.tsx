import { createContext, ReactNode, useState } from "react";
import {setCookie } from 'nookies'


type ISaveCredentials = {
    name: string;
    email: string;
    jwt: string;
}

type AuthContextData = {
    saveCredentials(credentials: ISaveCredentials): void;
    user: ISaveCredentials
    isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<ISaveCredentials>()
    const isAuthenticated = !!user;

    function saveCredentials({ name, email, jwt }: ISaveCredentials) {
        setUser({
            name, email, jwt
        })
        
        setCookie(null, 'jwt', jwt, {
            maxAge: 30 * 24 * 60,
            path: '/',
        })
    }

    return (
        <AuthContext.Provider value={{ saveCredentials, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}