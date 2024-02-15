import Sidebar from '@/components/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from '@/utils/api/authAxios';
import { ProjectDocument } from '@/utils/types';
import NewProjectModal from '@/components/NewProjectModal';
import BgStars from '@/components/MainPageBg';
import Editor from '@/components/Editor';
import ExplorerBar from '@/components/ExplorerBar';

const CodePage: React.FC = () => {
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
            <main className='h-screen overflow-hidden bg-secondary-bg/50 pb-16 md:pl-18 -md:pt-16'>
                <ExplorerBar />
                <Editor />
            </main>
            <NewProjectModal open={creatingProject} onClose={() => setCreatingProject(false)} />
        </div>
    );
};

export default CodePage;
