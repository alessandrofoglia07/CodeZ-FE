import React from 'react';
import BgStars from '@/components/MainPageBg';
import Sidebar from '@/components/Sidebar';

const MainPage: React.FC = () => {
    return (
        <div>
            <div id='bg' className='fixed -z-50 h-full w-full'>
                <BgStars />
            </div>
            <Sidebar />
            <main className='h-screen w-screen md:pl-18 -md:pt-16'></main>
        </div>
    );
};

export default MainPage;
