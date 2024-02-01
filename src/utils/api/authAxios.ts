import axios from 'axios';
import AccessToken from '@/utils/auth/AccessToken';
import RefreshToken from '@/utils/auth/RefreshToken';
import logout from '@/utils/auth/logout';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

api.interceptors.request.use((config) => {
    const token = AccessToken.get();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalConfig = err.config;

        if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            const refreshToken = RefreshToken.get();

            try {
                const newAccessToken = await AccessToken.refresh(refreshToken);

                originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return api(originalConfig);
            } catch (err) {
                logout();
                throw err;
            }
        }

        return Promise.reject(err);
    }
);

export default api;
