import Sidebar from '@/components/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from '@/utils/api/authAxios';
import { ProjectDocument } from '@/utils/types';
import Project from '@/components/Project';
import { FaPlus } from 'react-icons/fa';
import NewProjectModal from '@/components/NewProjectModal';
import BgStars from '@/components/MainPageBg';

const DashboardPage: React.FC = () => {
    const [projects, setProjects] = useState<ProjectDocument[]>([]);
    const [creatingProject, setCreatingProject] = useState(false);

    const fetchProjects = async () => {
        const res = await axios.get('/projects');
        setProjects(res.data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <div id='bg' className='fixed -z-50 h-full w-full'>
                <BgStars />
            </div>
            <Sidebar />
            <main className='min-h-screen bg-secondary-bg/50 pb-16 md:pl-18 -md:pt-16'>
                <h1 className='px-8 pb-12 pt-16 font-noto_sans_mono text-5xl font-extrabold tracking-tight text-slate-400'>Dashboard</h1>
                <div className='flex h-full w-full flex-wrap gap-8 px-8 py-4'>
                    <button
                        onClick={() => setCreatingProject(true)}
                        className='group grid h-72 w-72 place-items-center rounded-2xl bg-slate-100/10 transition-colors hover:bg-slate-100/15'>
                        <FaPlus className='text-7xl text-slate-100/80' />
                    </button>
                    {projects.map((project) => (
                        <Project project={project} key={project._id} />
                    ))}
                </div>
            </main>
            <NewProjectModal open={creatingProject} onClose={() => setCreatingProject(false)} />
        </div>
    );
};

export default DashboardPage;
