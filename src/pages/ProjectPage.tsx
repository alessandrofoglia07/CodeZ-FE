import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchProject = (id?: string) => {
        if (!id) return;
        console.log('fetching project'); // TODO: Fetch project from the backend
    };

    useEffect(() => {
        fetchProject(id);
    }, [id]);

    if (!id) {
        navigate('/dashboard');
    }

    return (
        <div id='ProjectPage'>
            <h1>ProjectPage</h1>
        </div>
    );
};

export default ProjectPage;
