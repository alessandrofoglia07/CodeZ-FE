import BgStars from '@/components/MainPageBg';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { usernameSchema, emailSchema, passwordSchema, authFormSchema as formSchema } from '@/utils/validation';
import { AuthFormSchema as FormSchema } from '@/utils/types';
import { signup } from '@/utils/api/authApi';
import { useNavigate } from 'react-router-dom';
import handleErr from '@/utils/handleErr';

const schemas = {
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
};

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<FormSchema>({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<Partial<FormSchema>>({
        username: undefined,
        email: undefined,
        password: undefined
    });
    const [confirmError, setConfirmError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error[e.target.name as keyof FormSchema]) {
            const val = schemas[e.target.name as keyof FormSchema].safeParse(e.target.value);
            if (val.success) {
                setError({ ...error, [e.target.name]: undefined });
            }
        }
    };

    const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: if user is already logged in, redirect to home page

        const val = formSchema.safeParse(form);
        if (!val.success) {
            return setError(
                val.error.errors.reduce(
                    (acc, curr) => ({
                        ...acc,
                        [curr.path[0] as keyof FormSchema]: curr.message
                    }),
                    {} as Partial<FormSchema>
                )
            );
        }

        try {
            await signup(form.username, form.email, form.password);
            navigate('/auth/login');
        } catch (err) {
            handleErr(err, setConfirmError);
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
                    <h1 className='py-4 font-noto_sans_mono text-3xl font-bold'>sign up</h1>
                    <form onSubmit={handleConfirm} autoComplete='off' spellCheck='false' className='flex h-full w-full flex-col items-center gap-4 py-4'>
                        <div className='flex w-3/4 flex-col items-center md:w-2/3'>
                            <input
                                className='h-12 w-full bg-transparent p-4 font-noto_sans_mono text-lg text-slate-100 focus-visible:outline-none'
                                type='username'
                                placeholder='Username'
                                name='username'
                                id='username'
                                onChange={handleChange}
                                value={form.username}
                            />
                            <p className='w-full px-4 font-noto_sans_mono leading-5 tracking-tight'>{error.username}</p>
                        </div>
                        <div className='flex w-3/4 flex-col items-center md:w-2/3'>
                            <input
                                className='h-12 w-full bg-transparent p-4 font-noto_sans_mono text-lg text-slate-100 focus-visible:outline-none'
                                type='email'
                                placeholder='Email'
                                name='email'
                                id='email'
                                onChange={handleChange}
                                value={form.email}
                            />
                            <p className='w-full px-4 font-noto_sans_mono leading-5 tracking-tight'>{error.email}</p>
                        </div>
                        <div className='flex w-3/4 flex-col items-center md:w-2/3'>
                            <input
                                className='h-12 w-full bg-transparent p-4 font-noto_sans_mono text-lg text-slate-100 focus-visible:outline-none'
                                type='password'
                                placeholder='Password'
                                name='password'
                                id='password'
                                onChange={handleChange}
                                value={form.password}
                            />
                            <p className='w-full px-4 font-noto_sans_mono leading-5 tracking-tight'>{error.password}</p>
                        </div>
                        <button type='submit' className='mt-8 font-noto_sans_mono text-2xl'>
                            confirm
                        </button>
                        <p className='mb-8 px-4 font-noto_sans_mono leading-5 tracking-tight'>{confirmError}</p>
                    </form>
                    <a href='/auth/login' className='font-noto_sans_mono text-slate-400'>
                        already have an account?
                    </a>
                </div>
            </main>
        </div>
    );
};

export default SignUpPage;
