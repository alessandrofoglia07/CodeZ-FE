import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/MainPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import useAuth from '@/hooks/useAuth';
import PrivateRoutes from './PrivateRoutes';
import DashboardPage from '@/pages/DashboardPage';
import ProjectPage from '@/pages/ProjectPage';

const App: React.FC = () => {
    const isAuth = useAuth();

    return (
        <Routes>
            {/* Public routes */}
            <Route path='/' element={<HomePage />} />

            {/* Auth routes */}
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path='/auth/signup' element={<SignUpPage />} />

            {/* Private routes */}
            <Route element={<PrivateRoutes isAuth={isAuth} />}>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/projects/:id' element={<ProjectPage />} />
            </Route>
        </Routes>
    );
};

export default App;
