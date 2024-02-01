import AccessToken from '@/utils/auth/AccessToken';
import RefreshToken from '@/utils/auth/RefreshToken';
import User from '@/utils/auth/User';
import { useEffect } from 'react';

const useAuth = () => {
    const refreshToken = RefreshToken.get();
    const accessToken = AccessToken.get();
    const user = User.get();

    useEffect(() => {
        (async () => {
            if (refreshToken && (!accessToken || !user)) await AccessToken.refresh();
        })();
    }, [accessToken]);

    return !!refreshToken && !!user;
};

export default useAuth;
