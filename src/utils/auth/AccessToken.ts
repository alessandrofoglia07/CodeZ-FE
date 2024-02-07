import axios from '@/utils/api/axios';
import Cookies from 'js-cookie';
import RefreshToken from '@/utils/auth/RefreshToken';
import logout from './logout';
import { isAxiosError } from 'axios';

/**
 * AccessToken class to manage access token in cookies
 */
export default class AccessToken {
    public static set(accessToken: string) {
        Cookies.set('access_token', accessToken, { expires: new Date(Date.now() + 15 * 60 * 1000) }); // 15 minutes
    }

    public static get(): string | undefined {
        return Cookies.get('access_token');
    }

    public static remove() {
        Cookies.remove('access_token');
    }

    public static async refresh(refreshToken?: string): Promise<string | void> {
        if (!refreshToken) {
            refreshToken = RefreshToken.get();
            if (!refreshToken) throw new Error('No refresh token found');
        }
        try {
            const res = await axios.post('/auth/refresh-token', { refreshToken });
            const { accessToken } = res.data;
            this.set(accessToken);
            return accessToken;
        } catch (err) {
            if (isAxiosError(err) && err.response && err.response.status === 403) {
                logout();
            }
            throw err;
        }
    }
}
