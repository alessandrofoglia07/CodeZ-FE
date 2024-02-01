import { UserInfo } from '@/utils/types';

/**
 * User class to manage user info in localStorage
 *
 * `UserInfo` type is defined in `frontend/src/utils/types.ts`
 * ```ts
 * {
 *     userId: string;
 *     email: string;
 *     username: string;
 * }
 * ```
 */
export default class User {
    public static set(userInfo: UserInfo) {
        localStorage.setItem('user', JSON.stringify(userInfo));
    }

    public static get(): UserInfo | null {
        const userInfo = localStorage.getItem('user');
        return userInfo ? JSON.parse(userInfo) : null;
    }

    public static remove() {
        localStorage.removeItem('user');
    }
}
