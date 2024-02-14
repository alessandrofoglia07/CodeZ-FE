import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/MainPage';
import PrivateRoutes from './PrivateRoutes';
import CodePage from '@/pages/CodePage';
import ProjectPage from '@/pages/ProjectPage';
import { AuthContext } from '@/context/AuthContext';
import NotFoundPage from '@/pages/404Page';

const App: React.FC = () => {
    const { isAuth } = useContext(AuthContext)!;

    return (
        <Routes>
            {/* Public routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<NotFoundPage />} />

            {/* Private routes */}
            <Route element={<PrivateRoutes isAuth={isAuth} />}>
                <Route path='/code' element={<CodePage />} />
                <Route path='/projects/:id' element={<ProjectPage />} />
            </Route>
        </Routes>
    );
};

export default App;
