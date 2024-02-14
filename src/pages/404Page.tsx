import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
            // This makes the redirect happen after all of the other code is ran (so that it doesn't get interrupted by AuthContext's useEffect)
        }, 0);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return <Navigate to='/' />;
};

export default NotFoundPage;
