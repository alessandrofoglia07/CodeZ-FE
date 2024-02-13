import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserInfo } from '@/utils/types';
import AccessToken from '@/utils/auth/AccessToken';
import RefreshToken from '@/utils/auth/RefreshToken';
import User from '@/utils/auth/User';

type AuthContextType = {
    accessToken: string | null;
    refreshToken: string | null;
    userData: UserInfo | null;
    isAuth: boolean;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [userData, setUserData] = useState<UserInfo | null>(User.get());
    const [accessToken, setAccessToken] = useState<string | null>(AccessToken.get() || null);
    const [refreshToken, setRefreshToken] = useState<string | null>(RefreshToken.get() || null);

    const isAuth = !!refreshToken && !!userData;

    const resetAuthParams = () => {
        searchParams.delete('accessToken');
        searchParams.delete('refreshToken');
        searchParams.delete('username');
        searchParams.delete('userId');
        searchParams.delete('email');
        searchParams.delete('profile_img');

        setSearchParams(searchParams);
    };

    const logout = () => {
        setUserData(null);
        setAccessToken(null);
        setRefreshToken(null);
        AccessToken.remove();
        RefreshToken.remove();
        User.remove();
    };

    useEffect(() => {
        if (isAuth) return resetAuthParams();

        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const username = searchParams.get('username');
        const userId = searchParams.get('userId');
        const email = searchParams.get('email');
        const profile_img = searchParams.get('profile_img');

        if (accessToken && refreshToken) {
            setAccessToken(accessToken);
            AccessToken.set(accessToken);
            setRefreshToken(refreshToken);
            RefreshToken.set(refreshToken);

            if (username && userId) {
                const userData = { username, userId, email: email || undefined, profile_img: profile_img || undefined };
                User.set(userData);
                setUserData(userData);
            }
        }

        resetAuthParams();
    }, []);

    useEffect(() => {
        if (refreshToken && (!accessToken || !userData)) {
            (async () => {
                const newAccessToken = await AccessToken.refresh();
                if (newAccessToken) setAccessToken(newAccessToken);
            })();
        }
    }, [accessToken]);

    return <AuthContext.Provider value={{ userData, accessToken, refreshToken, isAuth, logout }}>{children}</AuthContext.Provider>;
};
