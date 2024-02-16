import React from 'react';
import { Resizable } from 're-resizable';
import { useDraggable } from '@dnd-kit/core';

interface Props {
    id?: string;
}

const ExplorerBar: React.FC<Props> = ({ id }: Props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id || 'draggable-explorer-bar'
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
          }
        : undefined;

    return (
        <div className='flex h-screen w-max' ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Resizable
                defaultSize={{ width: 300, height: '100vh' }}
                minWidth={150}
                maxWidth='80%'
                enable={{ right: true }}
                handleStyles={{
                    right: {
                        width: '4px',
                        cursor: 'w-resize'
                    }
                }}
                handleClasses={{
                    right: 'h-screen bg-gray-600 pl-2 opacity-0 hover:animate-opacity-explorer-bar active:animate-opacity-explorer-bar'
                }}>
                <div className='z-50 h-screen border-r border-gray-400/50 bg-slate-800/70'>Hello world</div>
            </Resizable>
        </div>
    );
};

export default ExplorerBar;
