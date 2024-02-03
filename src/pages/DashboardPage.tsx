import Sidebar from '@/components/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from '@/utils/api/authAxios';
import { ProjectDocument } from '@/utils/types';
import Project from '@/components/Project';
import { FaPlus } from 'react-icons/fa';

const DashboardPage: React.FC = () => {
    const [projects, setProjects] = useState<ProjectDocument[]>([]);

    const fetchProjects = async () => {
        const res = await axios.get('/projects');
        setProjects(res.data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <Sidebar />
            <main className='bg-secondary-bg min-h-screen pb-16 md:pl-18 -md:pt-16'>
                <h1 className='px-8 pb-12 pt-16 font-noto_sans_mono text-5xl font-extrabold tracking-tight'>Your projects</h1>
                <div className='flex h-full w-full flex-wrap gap-8 px-8 py-4'>
                    <button className='group grid h-72 w-72 place-items-center rounded-2xl bg-slate-100/10 transition-colors hover:bg-slate-100/15'>
                        <FaPlus className='text-7xl text-slate-100/80' />
                    </button>
                    {projects.map((project) => (
                        <Project project={project} key={project._id} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;