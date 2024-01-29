import BgStars from '@/components/MainPageBg';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { AuthFormSchema } from '@/utils/types';

type FormSchema = Omit<AuthFormSchema, 'username'>;

const LoginPage: React.FC = () => {
    const [form, setForm] = useState<FormSchema>({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: send request to backend
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
                        <button type='submit' className='my-8 font-noto_sans_mono text-2xl'>
                            confirm
                        </button>
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
