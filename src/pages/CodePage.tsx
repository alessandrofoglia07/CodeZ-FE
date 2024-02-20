import Sidebar from '@/components/Sidebar';
import React, { useEffect, useState } from 'react';
import BgStars from '@/components/MainPageBg';
import Editor from '@/components/Editor';
import ExplorerBar from '@/components/ExplorerBar';
import DropZone from '@/components/DropZone';
import { Position } from '@/utils/types';

const CodePage: React.FC = () => {
    const [explorerParentState, setExplorerParent] = useState<Position>('l');
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState<Position | null>(null);
    const [editorWidth, setEditorWidth] = useState<number>(window.innerWidth / 2);
    const [editorLeft, setEditorLeft] = useState<number>(72); // 72px - Sidebar width

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setExplorerParent((prev) => {
            if (isOver) {
                handleResize(undefined, isOver);
                return isOver;
            }
            handleResize(undefined, explorerParentState);
            return prev;
        });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, el: Position) => {
        e.preventDefault();
        if (isDragging) {
            setIsOver(el);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, el: Position) => {
        e.preventDefault();
        setIsDragging(false);
        setExplorerParent(el);
        handleResize(undefined, el);
    };

    useEffect(() => {
        if (!isDragging) {
            setIsOver(null);
        }
    }, [isDragging]);

    const handleResize = (e?: MouseEvent | TouchEvent, specificParent?: Position) => {
        e?.preventDefault();

        // TODO: fix bug: resize explorer bar, then move it to the other side => editor width is not updated

        const el = document.getElementById('resizable-bar');
        if (!el) return;

        const explorerW = el.getBoundingClientRect().width;
        const sidebarWidth = 72;

        setEditorWidth(window.innerWidth - explorerW - sidebarWidth);
        const explorerParent = specificParent ? specificParent : explorerParentState;
        setEditorLeft(explorerParent === 'l' ? explorerW + sidebarWidth : sidebarWidth);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', () => handleResize());
        return () => window.removeEventListener('resize', () => handleResize());
    }, []);

    // TODO: make this also handle Editor component

    return (
        <div>
            <div id='bg' className='fixed -z-50 h-full w-full'>
                <BgStars />
            </div>
            <Sidebar />
            <main className='h-screen overflow-hidden bg-secondary-bg/50 pb-16 md:pl-18 -md:pt-16'>
                <DropZone onDragOver={(e) => handleDragOver(e, 'l')} isOver={isOver === 'l'} isParent={explorerParentState === 'l'}>
                    {explorerParentState === 'l' ? (
                        <ExplorerBar onDragStart={handleDragStart} onDragEnd={handleDragEnd} parent={explorerParentState} onResize={(e) => handleResize(e)} />
                    ) : null}
                </DropZone>
                <Editor w={editorWidth} left={editorLeft} />
                <DropZone position='r' onDragOver={(e) => handleDragOver(e, 'r')} isOver={isOver === 'r'} isParent={explorerParentState === 'r'} onDrop={handleDrop}>
                    {explorerParentState === 'r' ? (
                        <ExplorerBar onDragStart={handleDragStart} onDragEnd={handleDragEnd} parent={explorerParentState} onResize={(e) => handleResize(e)} />
                    ) : null}
                </DropZone>
            </main>
        </div>
    );
};

export default CodePage;
