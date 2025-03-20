import { createContext, useContext, useState } from 'react';
import { UserProfile } from '../apis/user.api';

type AuthContextType = {
    accessToken: string | null;
    user: UserProfile | null;
    logout: () => void;
    login: (token: string) => void;
    setUser: (user: UserProfile) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = (token: string) => setAccessToken(token);
    const logout = () => {
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, setUser, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used with AuthProvider');
    return context;
}
