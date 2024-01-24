import React, { useEffect, useState } from 'react';

interface StarEl {
    x: number;
    y: number;
    size: number;
    orientation?: 'top-bottom' | 'bottom-top';
}

const Star = ({ x, y, size, orientation = 'bottom-top' }: StarEl) => {
    const style: React.CSSProperties = {
        top: y,
        left: x,
        width: size,
        height: size,
        animation: `${orientation === 'bottom-top' ? 'float1' : 'float2'} ${Math.floor(Math.random() * 10) + 5}s ease-in-out infinite`
    };

    return <div className='star fixed rounded-full bg-slate-300' style={style} />;
};

const BgStars: React.FC = () => {
    const [stars, setStars] = useState<StarEl[]>([]);

    const removeStars = async () => {
        const stars = document.getElementsByClassName('star');

        for (const star of stars) {
            star.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, fill: 'forwards' });
        }

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setStars([]);
                resolve();
            }, 700);
        });
    };

    const changeStars = async () => {
        const { innerWidth, innerHeight } = window;

        if (stars.length > 0) {
            await removeStars();
        }

        const currStars: StarEl[] = [];

        for (let i = 0; i < 30; i++) {
            const x = Math.random() * innerWidth;
            const y = Math.random() * innerHeight;
            const size = Math.floor(Math.random() * 3 + 1);

            currStars.push({ x, y, size });
        }

        setStars([...currStars]);
    };

    useEffect(() => {
        changeStars();
        const interval = setInterval(changeStars, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {stars.map(({ x, y, size }, i) => (
                <Star key={i} x={x} y={y} orientation={i % 2 === 0 ? 'bottom-top' : 'top-bottom'} size={size} />
            ))}
        </>
    );
};

const MainPage: React.FC = () => {
    return (
        <div>
            <div id='bg' className='fixed h-full w-full'>
                <BgStars />
            </div>
            <h1>Main Page</h1>
        </div>
    );
};

export default MainPage;
