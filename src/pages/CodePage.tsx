import Sidebar from '@/components/Sidebar';
import React, { useEffect, useState } from 'react';
import BgStars from '@/components/MainPageBg';
// import Editor from '@/components/Editor';
import ExplorerBar from '@/components/ExplorerBar';
import DropZone from '@/components/DropZone';
import { Position } from '@/utils/types';

const CodePage: React.FC = () => {
    const [explorerParent, setExplorerParent] = useState<Position>('l');
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState<Position | null>(null);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setExplorerParent((prev) => (isOver ? isOver : prev));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, el: Position) => {
        e.preventDefault();
        if (isDragging) {
            setIsOver(el);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, el: Position) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(false);
        setExplorerParent(el);
    };

    useEffect(() => {
        if (!isDragging) {
            setIsOver(null);
        }
    }, [isDragging]);

    // TODO: fix this it won't switch back from right to left
    // TODO: make this also handle Editor component

    return (
        <div>
            <div id='bg' className='fixed -z-50 h-full w-full'>
                <BgStars />
            </div>
            <Sidebar />
            <main className='h-screen overflow-hidden bg-secondary-bg/50 pb-16 md:pl-18 -md:pt-16'>
                <DropZone onDragOver={(e) => handleDragOver(e, 'l')} isOver={isOver === 'l'}>
                    {explorerParent === 'l' ? <ExplorerBar onDragStart={handleDragStart} onDragEnd={handleDragEnd} parent={explorerParent} /> : null}
                </DropZone>
                <DropZone position='r' onDragOver={(e) => handleDragOver(e, 'r')} isOver={isOver === 'r'} onDrop={handleDrop}>
                    {explorerParent === 'r' ? <ExplorerBar onDragStart={handleDragStart} onDragEnd={handleDragEnd} parent={explorerParent} /> : null}
                </DropZone>
            </main>
        </div>
    );
};

export default CodePage;
