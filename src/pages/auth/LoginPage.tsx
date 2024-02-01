import BgStars from '@/components/MainPageBg';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { AuthFormSchema } from '@/utils/types';
import { login } from '@/utils/api/authApi';
import User from '@/utils/auth/User';
import AccessToken from '@/utils/auth/AccessToken';
import RefreshToken from '@/utils/auth/RefreshToken';
import handleErr from '@/utils/handleErr';

type FormSchema = Omit<AuthFormSchema, 'username'>;

const LoginPage: React.FC = () => {
    const [form, setForm] = useState<FormSchema>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: if user is already logged in, redirect to home page

        try {
            const res = await login(form.email, form.password);

            const { userId, email, username, accessToken, refreshToken } = res.data;
            User.set({ userId, email, username });
            AccessToken.set(accessToken);
            RefreshToken.set(refreshToken);
            window.location.href = '/';
        } catch (err) {
            handleErr(err, setError);
        }
    };

    return (
        <div>
            <div id='bg' className='fixed -z-50 h-full w-full'>
                <BgStars />
            </div>
            <Sidebar />
            <main className='h-screen w-screen md:pl-18 -md:pt-16'>
                <div className='center auth-form flex flex-col items-center'>
                    <h1 className='py-4 font-noto_sans_mono text-3xl font-bold'>login</h1>
                    <form onSubmit={handleConfirm} autoComplete='off' spellCheck='false' className='flex h-full w-full flex-col items-center gap-4 py-4'>
                        <input
                            className='h-12 w-3/4 bg-transparent p-4 font-noto_sans_mono text-lg text-slate-100 focus-visible:outline-none md:w-2/3'
                            type='email'
                            placeholder='Email'
                            name='email'
                            id='email'
                            value={form.email}
                            onChange={handleChange}
                        />
                        <input
                            className='h-12 w-3/4 bg-transparent p-4 font-noto_sans_mono text-lg text-slate-100 focus-visible:outline-none md:w-2/3'
                            type='password'
                            placeholder='Password'
                            name='password'
                            id='password'
                            value={form.password}
                            onChange={handleChange}
                        />
                        <button type='submit' className='mt-8 font-noto_sans_mono text-2xl'>
                            confirm
                        </button>
                        <p className='mb-8 font-noto_sans_mono text-slate-400'>{error}</p>
                    </form>
                    <a href='/auth/signup' className='font-noto_sans_mono text-slate-400'>
                        don't have an account?
                    </a>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
