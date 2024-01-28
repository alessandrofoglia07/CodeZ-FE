import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/MainPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpPage from '@/pages/auth/SignUpPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path='/auth/signup' element={<SignUpPage />} />
        </Routes>
    );
};

export default App;
