import React from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
    isAuth: boolean;
}

const PrivateRoutes: React.FC<Props> = ({ isAuth }: Props) => {
    if (isAuth) {
        return <Outlet />;
    }

    // Start the GitHub OAuth flow
    window.location.replace(`${import.meta.env.VITE_API_URL}/auth/github?redirect=${window.location.href}`);

    return null;
};

export default PrivateRoutes;
