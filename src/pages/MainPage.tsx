import React, { useEffect, useState } from 'react';

interface StarEl {
    x: number;
    y: number;
    size: number;
    orientation?: 'top-bottom' | 'bottom-top';
    fading_out?: boolean;
}

const Star = ({ x, y, size, orientation = 'bottom-top', fading_out }: StarEl) => {
    const [animationDuration] = useState<number>(Math.floor(Math.random() * 10) + 5);

    const style: React.CSSProperties = {
        top: y,
        left: x,
        width: size,
        height: size,
        animation: `fadeIn 0.6s ease-in-out forwards, ${orientation === 'bottom-top' ? 'float1' : 'float2'} ${animationDuration}s ease-in-out infinite${fading_out ? ', fadeOut 0.6s ease-in-out forwards' : ''}`
    };

    return <div className='star fixed rounded-full bg-slate-300' style={style} />;
};

const BgStars: React.FC = () => {
    const [stars, setStars] = useState<StarEl[]>([]);

    const removeStars = async () => {
        setStars((prev) => prev.map((star) => ({ ...star, fading_out: true })));

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setStars([]);
                resolve();
            }, 700);
        });
    };

    const changeStars = async () => {
        const { innerWidth, innerHeight } = window;

        const stars = document.getElementsByClassName('star');

        if (stars.length > 0) {
            await removeStars();
        }

        const currStars: StarEl[] = [];

        for (let i = 0; i < 30; i++) {
            const x = Math.random() * innerWidth;
            const y = Math.random() * innerHeight;
            const size = Math.floor(Math.random() * 3 + 1);

            currStars.push({ x, y, size, fading_out: false });
        }

        setStars([...currStars]);

        const starEls = document.getElementsByClassName('star');
        for (let i = 0; i < stars.length; i++) {
            const star = starEls[i] as HTMLElement;
            const currAnimation = star.style.animation;
            star.style.animation = 'none';
            void star.offsetWidth; // Trigger reflow
            star.style.animation = currAnimation;
        }
    };

    useEffect(() => {
        changeStars();
        const interval = setInterval(changeStars, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {stars.map(({ x, y, size, fading_out }, i) => (
                <Star key={i} x={x} y={y} orientation={i % 2 === 0 ? 'bottom-top' : 'top-bottom'} fading_out={fading_out} size={size} />
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
