import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import BgStars from '@/components/MainPageBg';
// import Editor from '@/components/Editor';
import ExplorerBar from '@/components/ExplorerBar';
import DropZone from '@/components/DropZone';
import { DndContext, DragEndEvent, UniqueIdentifier, useSensors, useSensor, PointerSensor, TouchSensor } from '@dnd-kit/core';

const CodePage: React.FC = () => {
    const containers = ['A', 'B'];
    const [parent, setParent] = useState<UniqueIdentifier | null>(null);

    const handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e;
        if (active.id === over?.id) return;

        setParent(over ? over.id : null);
    };

    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    // TODO: FIX THIS

    return (
        <div>
            <div id='bg' className='fixed -z-50 h-full w-full'>
                <BgStars />
            </div>
            <Sidebar />
            <main className='h-screen overflow-hidden bg-secondary-bg/50 pb-16 md:pl-18 -md:pt-16'>
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    {parent === null ? <ExplorerBar /> : null}
                    {containers.map((id, i) => (
                        <DropZone key={id} id={id} position={i % 2 === 0 ? 'l' : 'r'}>
                            {parent === id ? <ExplorerBar /> : null}
                        </DropZone>
                    ))}
                    {/* <DropZone />
                    <ExplorerBar />
                    <Editor />
                    <DropZone position='r' /> */}
                </DndContext>
            </main>
        </div>
    );
};

export default CodePage;
