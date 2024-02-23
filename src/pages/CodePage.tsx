import Sidebar from '@/components/Sidebar';
import React, { useEffect, useRef, useState } from 'react';
import BgStars from '@/components/MainPageBg';
import Editor from '@/components/Editor';
import ExplorerBar from '@/components/ExplorerBar';
import DropZone from '@/components/DropZone';
import { Position } from '@/utils/types';
import BottomBar from '@/components/BottomBar';

interface Dimension {
    width: number | string;
    height: number | string;
}

const CodePage: React.FC = () => {
    const [explorerParentState, setExplorerParent] = useState<Position | null>('l');
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState<Position | null>(null);
    const [editorDimensions, setEditorDimensions] = useState<Dimension>({ width: window.innerWidth / 2 - 72, height: '100vh' });
    const [editorLeft, setEditorLeft] = useState<number>(72); // 72px - Sidebar width

    const mousePos = useRef([0, 0] as [number, number]);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setExplorerParent((prev) => {
            if (isOver) {
                handleEditorWindowResizeDelay(undefined, isOver);
                return isOver;
            }
            handleEditorWindowResizeDelay(undefined, explorerParentState || undefined);
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
        handleEditorWindowResizeDelay(undefined, el);
    };

    useEffect(() => {
        if (!isDragging) {
            setIsOver(null);
        }
    }, [isDragging]);

    const handleResizeStart = () => {
        window.addEventListener('mousemove', (e) => {
            mousePos.current = [e.clientX, e.clientY];
        });
    };

    const handleResizeStop = () => {
        window.removeEventListener('mousemove', () => {
            mousePos.current = [0, 0];
        });
    };

    const handleExplorerResize = (e: MouseEvent | TouchEvent, direction: string) => {
        handleEditorWindowResize(e);

        if (direction.split('')[0] === explorerParentState) return;

        const explorerW = document.getElementById('resizable-bar')?.getBoundingClientRect().width;
        if (!explorerW) return;
        const sidebarWidth = 72;

        switch (explorerParentState) {
            case 'l':
                if (mousePos.current[0] - sidebarWidth < explorerW / 2 - 35) {
                    setExplorerParent(null);
                }
                break;
            case 'r':
                if (window.innerWidth - mousePos.current[0] - sidebarWidth < explorerW / 2 - 35) {
                    setExplorerParent(null);
                }
                break;
        }
    };

    const handleEditorWindowResizeDelay = (e?: MouseEvent | TouchEvent, specificParent?: Position) => {
        setTimeout(() => {
            handleEditorWindowResize(e, specificParent);
        }, 0);
    };

    const handleEditorWindowResize = (e?: MouseEvent | TouchEvent, specificParent?: Position) => {
        e?.preventDefault();

        const elX = document.getElementById('inner-sidebar');
        const elY = document.getElementById('bottom-bar');
        if (elX) {
            const explorerW = elX.getBoundingClientRect().width;
            const sidebarWidth = 72;

            setEditorDimensions((prev) => {
                return { ...prev, width: window.innerWidth - explorerW - sidebarWidth };
            });
            const explorerParent = specificParent ? specificParent : explorerParentState;
            setEditorLeft(explorerParent === 'l' ? explorerW + sidebarWidth : sidebarWidth);
        }

        if (elY) {
            const bottomBarH = elY.getBoundingClientRect().height;

            setEditorDimensions((prev) => {
                return { ...prev, height: window.innerHeight - bottomBarH };
            });
        }
    };

    useEffect(() => {
        handleEditorWindowResize();
        window.addEventListener('resize', () => handleEditorWindowResize());
        return () => window.removeEventListener('resize', () => handleEditorWindowResize());
    }, []);

    const handleBottomResize = (e?: MouseEvent | TouchEvent) => {
        e?.preventDefault();
        handleEditorWindowResizeDelay();
    };

    // TODO: Make better sidebar and handle explorerParentState null

    // TODO: Make everything responsive

    return (
        <div>
            <div id='bg' className='fixed -z-50 h-full w-full'>
                <BgStars />
            </div>
            <Sidebar />
            <main className='h-screen overflow-hidden bg-secondary-bg/50 pb-16 md:pl-18 -md:pt-16'>
                <div>
                    <DropZone onDragOver={(e) => handleDragOver(e, 'l')} isOver={isOver === 'l'} isParent={explorerParentState === 'l'}>
                        {explorerParentState === 'l' ? (
                            <ExplorerBar
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                parent={explorerParentState}
                                onResize={handleExplorerResize}
                                onResizeStart={handleResizeStart}
                                onResizeStop={handleResizeStop}
                            />
                        ) : null}
                    </DropZone>
                    <Editor w={editorDimensions.width} h={editorDimensions.height} left={editorLeft} />
                    <DropZone position='r' onDragOver={(e) => handleDragOver(e, 'r')} isOver={isOver === 'r'} isParent={explorerParentState === 'r'} onDrop={handleDrop}>
                        {explorerParentState === 'r' ? (
                            <ExplorerBar
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                parent={explorerParentState}
                                onResize={handleExplorerResize}
                                onResizeStart={handleResizeStart}
                                onResizeStop={handleResizeStop}
                            />
                        ) : null}
                    </DropZone>
                </div>
                <BottomBar
                    w={editorDimensions.width}
                    explorerParentState={explorerParentState}
                    onResize={handleBottomResize}
                    onResizeStart={handleResizeStart}
                    onResizeStop={handleResizeStop}
                />
            </main>
        </div>
    );
};

export default CodePage;
