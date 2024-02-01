import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
    isAuth: boolean;
}

const PrivateRoutes: React.FC<Props> = ({ isAuth }: Props) => {
    return isAuth ? <Outlet /> : <Navigate to='/auth/login' />;
};

export default PrivateRoutes;
