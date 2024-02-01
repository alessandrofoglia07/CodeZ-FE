import axios from '@/utils/api/axios';

export const signup = async (username: string, email: string, password: string) => {
    const res = await axios.post('/auth/signup', { username, email, password });
    return res;
};

export const login = async (email: string, password: string) => {
    const res = await axios.post('/auth/login', { email, password });
    return res;
};
