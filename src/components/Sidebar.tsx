import React from 'react';
import Logo from './Logo';
import { GoHome } from 'react-icons/go';

const Item = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
    return (
        <a
            href={href}
            className={`group grid h-min w-full place-items-center *:text-3xl  ${window.location.pathname === href ? '*:text-primary' : '*:text-slate-300 *:transition-colors *:group-hover:text-slate-100'}`}>
            {window.location.pathname === href && <div className='bg-primary absolute left-0 h-12 w-1 rounded-r-lg' />}
            {icon}
        </a>
    );
};

const Sidebar: React.FC = () => {
    return (
        <aside id='Sidebar' className='bg-secondary w-18 fixed z-10 flex h-screen flex-col items-center gap-2 border-r border-slate-700'>
            <Logo containerClassName='py-6' />
            <Item icon={<GoHome />} href='/' />
        </aside>
    );
};

export default Sidebar;
