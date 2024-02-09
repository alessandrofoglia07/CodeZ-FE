import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { projectNameSchema, projectDescriptionSchema, githubLinkSchema } from '@/utils/validation';
import axios from '@/utils/api/authAxios';
import { useNavigate } from 'react-router-dom';
import handleErr from '@/utils/handleErr';

interface Props {
    open: boolean;
    onClose: () => void;
}

interface Form {
    name: string;
    description: string;
    githubLink: string;
}

const defaultError: Partial<Form> = {
    name: undefined,
    description: undefined,
    githubLink: undefined
};

const defaultForm: Form = {
    name: '',
    description: '',
    githubLink: ''
};

const NewProjectModal: React.FC<Props> = ({ open, onClose }: Props) => {
    const navigate = useNavigate();

    const [form, setForm] = useState<Form>(defaultForm);
    const [error, setError] = useState<Partial<Form>>(defaultError);
    const [inputWidth, setInputWidth] = useState<number>(0);
    const [creationError, setCreationError] = useState<string | undefined>(undefined);

    const fixedWidthStyle: React.CSSProperties = { width: inputWidth };

    useEffect(() => {
        window.addEventListener('keydown', handleEscape);
        window.addEventListener('resize', handleResize);

        document.getElementById('name')?.addEventListener('keypress', handleEnterOnName);
        document.getElementById('description')?.addEventListener('keypress', handleEnterOnDescription);

        const modal = document.getElementById('new-project-modal');
        if (modal) modal.focus();

        return () => {
            document.getElementById('name')?.removeEventListener('keypress', handleEnterOnName);
            document.getElementById('description')?.removeEventListener('keypress', handleEnterOnDescription);
            window.removeEventListener('keydown', handleEscape);
            window.removeEventListener('resize', handleResize);
        };
    }, [open]);

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open) handleClose();
    };

    const handleEnterOnName = (e: KeyboardEvent) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        document.getElementById('description')?.focus();
    };

    const handleEnterOnDescription = (e: KeyboardEvent) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        document.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true }));
    };

    const handleResize = () => {
        setInputWidth(document.getElementById('name')?.offsetWidth || 0);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleResize();

        try {
            if (form.githubLink.length > 0) {
                const val = githubLinkSchema.safeParse(form.githubLink);

                if (!val.success) return setError((prev) => ({ ...prev, githubLink: val.error.errors[0]?.message || 'Invalid GitHub link' }));

                const res = await axios.post('/projects/new/github', { githubLink: form.githubLink, collaborators: [] });
                return navigate(`/projects/${res.data._id}`);
            }

            const name = projectNameSchema.safeParse(form.name);
            const description = projectDescriptionSchema.safeParse(form.description);

            if (!name.success) setError((prev) => ({ ...prev, name: name.error.errors[0]?.message || 'Invalid name' }));
            if (!description.success) setError((prev) => ({ ...prev, description: description.error.errors[0]?.message || 'Invalid description' }));

            if (!name.success || !description.success) return;

            setError((prev) => ({ ...prev, name: undefined, description: undefined }));

            const res = await axios.post('/projects/new/empty', { name: form.name, description: form.description, collaborators: [] });
            navigate(`/projects/${res.data._id}`);
        } catch (err) {
            handleErr(err, setCreationError);
        }
    };

    const handleClose = () => {
        onClose();
        setForm(defaultForm);
        setError(defaultError);
        setCreationError(undefined);
    };

    if (!open) return null;

    return (
        <>
            <div onClick={handleClose} className='fade-in fixed inset-0 z-40 flex h-screen w-screen items-center justify-center bg-black/40 transition-all' />
            <div
                id='new-project-modal'
                className='center fade-in max-w-screen !fixed z-50 flex h-max max-h-screen w-max flex-col items-center overflow-auto rounded-lg bg-[radial-gradient(ellipse_at_bottom_right,_rgba(41,_47,_63,_0.8)_0%,_#141e2a81_100%);] px-8 py-16 md:min-w-[500px] -md:w-screen'>
                <button onClick={onClose} className='absolute right-4 top-4'>
                    <IoClose className='text-4xl text-slate-100' />
                </button>
                <h1 className='py-4 font-noto_sans_mono text-3xl font-bold'>New project</h1>
                <form onSubmit={handleCreate} autoComplete='off' spellCheck='false' className='flex h-full w-full flex-col items-center gap-4 py-4'>
                    <div className='flex w-5/6 flex-col items-center'>
                        <input
                            className='h-12 w-full bg-transparent p-4 font-noto_sans_mono text-lg text-slate-100'
                            type='text'
                            placeholder='Name'
                            disabled={form.githubLink.length > 0}
                            name='name'
                            id='name'
                            value={form.name}
                            onChange={handleChange}
                        />
                        <p style={fixedWidthStyle} className='px-4 font-noto_sans_mono leading-5 tracking-tight'>
                            {error.name}
                        </p>
                    </div>
                    <div className='flex w-5/6 flex-col items-center'>
                        <textarea
                            className='h-max w-full resize-none bg-transparent p-4 font-noto_sans_mono text-lg text-slate-100'
                            placeholder='Description'
                            disabled={form.githubLink.length > 0}
                            name='description'
                            id='description'
                            value={form.description}
                            rows={6}
                            onChange={handleChange}
                        />
                        <p style={fixedWidthStyle} className='px-4 font-noto_sans_mono leading-5 tracking-tight'>
                            {error.description}
                        </p>
                    </div>
                    <div className='flex w-full items-center justify-center py-4'>
                        <div className='h-[1px] w-1/4 bg-slate-300' />
                        <p className='px-4 font-noto_sans_mono text-lg text-slate-100'>or</p>
                        <div className='h-[1px] w-1/4 bg-slate-300' />
                    </div>
                    <h6 className='w-5/6 px-4 font-noto_sans_mono'>Clone a GitHub repository</h6>
                    <div className='flex w-5/6 flex-col items-center'>
                        <input
                            className='h-12 w-full bg-transparent p-4 font-noto_sans_mono text-lg text-slate-100'
                            type='text'
                            placeholder='GitHub link'
                            name='githubLink'
                            disabled={form.name.length > 0 || form.description.length > 0}
                            id='github-link'
                            value={form.githubLink}
                            onChange={handleChange}
                        />
                        <p style={fixedWidthStyle} className='px-4 font-noto_sans_mono leading-5 tracking-tight'>
                            {error.githubLink}
                        </p>
                    </div>
                    <button type='submit' className='mt-8 font-noto_sans_mono text-2xl'>
                        create
                    </button>
                    {creationError && <p className='mb-8 px-4 font-noto_sans_mono leading-5 tracking-tight'>{creationError}</p>}
                </form>
            </div>
        </>
    );
};

export default NewProjectModal;
