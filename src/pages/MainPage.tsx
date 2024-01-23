import React, { useEffect, useState } from 'react';

interface StarEl {
    x: number;
    y: number;
    size: number;
}

const Star = ({ x, y, size }: StarEl) => {
    const style: React.CSSProperties = {
        top: y,
        left: x,
        width: size,
        height: size,
        animation: `floatInCircle ${Math.floor(Math.random() * 10) + 15}s linear infinite`
    };

    return <div className='star fixed rounded-full bg-slate-300' style={style} />;
};

const BgStars: React.FC = () => {
    const [stars, setStars] = useState<StarEl[]>([]);

    const removeStars = async () => {
        const stars = document.getElementsByClassName('star');

        // Fix this
        for (const star of stars) {
            star.classList.add('fade-out');
            setTimeout(() => {
                star.remove();
            }, 700);
        }
    };

    const changeStars = () => {
        const { innerWidth, innerHeight } = window;

        removeStars();

        const currStars = [];

        for (let i = 0; i < 30; i++) {
            const x = Math.random() * innerWidth;
            const y = Math.random() * innerHeight;
            const size = Math.floor(Math.random() * 3);

            currStars.push({ x, y, size });
        }

        setStars(currStars);
    };

    useEffect(() => {
        changeStars();
        const interval = setInterval(changeStars, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {stars.map(({ x, y, size }, i) => (
                <Star key={i} x={x} y={y} size={size} />
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
