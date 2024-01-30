import AccessToken from '@/utils/storage/AccessToken';
import RefreshToken from '@/utils/storage/RefreshToken';
import User from '@/utils/storage/User';
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
