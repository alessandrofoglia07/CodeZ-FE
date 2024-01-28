import React from 'react';
import Logo from './Logo';
import { GoHome } from 'react-icons/go';

const Item = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
    return (
        <a
            href={href}
            className={`group grid h-full w-min place-items-center *:text-3xl md:h-min md:w-full  ${window.location.pathname === href ? '*:text-primary' : '*:text-slate-300 *:transition-colors *:group-hover:text-slate-100'}`}>
            {window.location.pathname === href && <div className='absolute h-1 w-12 bg-primary md:left-0 md:h-12 md:w-1 md:rounded-r-lg -md:bottom-0 -md:rounded-lg' />}
            {icon}
        </a>
    );
};

const Sidebar: React.FC = () => {
    return (
        <aside id='Sidebar' className='fixed z-10 flex h-16 w-screen items-center gap-2 border-slate-700 transition-colors md:h-screen md:w-18 md:flex-col md:border-r md:bg-secondary'>
            <Logo containerClassName='md:py-6 -md:pl-6 -md:pr-8 -md:pt-4' />
            <Item icon={<GoHome />} href='/' />
        </aside>
    );
};

export default Sidebar;
