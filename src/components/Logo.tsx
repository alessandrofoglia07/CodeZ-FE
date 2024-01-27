import React from 'react';

interface Props {
    className?: string;
    containerClassName?: string;
}

const Logo: React.FC<Props> = ({ className, containerClassName }: Props) => {
    return (
        <div id='Logo' className={`flex w-min items-center justify-center ${containerClassName}`}>
            <a href='/' className={`font-courier_prime text-primary text-6xl font-bold ${className}`}>
                Z
            </a>
        </div>
    );
};

export default Logo;
