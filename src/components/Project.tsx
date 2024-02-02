import React, { useState, useEffect } from 'react';
import { ProjectDocument } from '@/utils/types';
import axios from '@/utils/api/authAxios';

interface ProjectProps {
    project: ProjectDocument;
}

const Project: React.FC<ProjectProps> = ({ project }: ProjectProps) => {
    const [owner, setOwner] = useState<string>('');

    const fetchOwnerUsername = async () => {
        const res = await axios.get(`/users/${project.owner}`);
        setOwner(res.data.username);
    };

    useEffect(() => {
        fetchOwnerUsername();
    }, []);

    return (
        <button className='flex h-72 w-72 flex-col justify-between rounded-2xl bg-slate-100/10 p-6 text-left transition-colors hover:bg-slate-100/15'>
            <div>
                <h2 className='pb-2 font-noto_sans_mono text-2xl font-bold tracking-tighter'>{project.name}</h2>
                <p className=''>{project.description}</p>
            </div>
            <div>
                {/* TODO: make this look better */}
                <p>Owner: {owner}</p>
                <p>Last edited at: {project.updatedAt}</p>
            </div>
        </button>
    );
};

export default Project;
