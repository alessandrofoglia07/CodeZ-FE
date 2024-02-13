import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/MainPage';
import PrivateRoutes from './PrivateRoutes';
import DashboardPage from '@/pages/DashboardPage';
import ProjectPage from '@/pages/ProjectPage';
import { AuthContext } from '@/context/AuthContext';

const App: React.FC = () => {
    const { isAuth } = useContext(AuthContext)!;

    return (
        <Routes>
            {/* Public routes */}
            <Route path='/' element={<HomePage />} />

            {/* Private routes */}
            <Route element={<PrivateRoutes isAuth={isAuth} />}>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/projects/:id' element={<ProjectPage />} />
            </Route>
        </Routes>
    );
};

export default App;
