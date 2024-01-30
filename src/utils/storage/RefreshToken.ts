import Cookies from 'js-cookie';

/**
 * RefreshToken class to manage refresh token in cookies
 */
export default class RefreshToken {
    public static set(refreshToken: string) {
        Cookies.set('refresh_token', refreshToken, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // 7 days
    }

    public static get(): string | undefined {
        return Cookies.get('refresh_token');
    }

    public static remove() {
        Cookies.remove('refresh_token');
    }
}
