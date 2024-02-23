import React from 'react';
import { Resizable, ResizeCallback, ResizeStartCallback } from 're-resizable';
import { Position } from '@/utils/types';
import CodeEditorDimensionsStorage from '@/utils/localStorage/CodeEditorDimensions';

interface Props {
    parent: Position;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    onResize: ResizeCallback;
    onResizeStart: ResizeStartCallback;
    onResizeStop: ResizeCallback;
}

const ExplorerBar: React.FC<Props> = ({ parent, onDragStart, onDragEnd, onResize, onResizeStart, onResizeStop }: Props) => {
    const handleStyles =
        parent === 'r'
            ? {
                  left: {
                      width: '4px',
                      cursor: 'w-resize'
                  }
              }
            : {
                  right: {
                      width: '4px',
                      cursor: 'e-resize'
                  }
              };

    const handleClasses =
        parent === 'r'
            ? {
                  left: 'h-screen bg-gray-600 pl-2 opacity-0 hover:animate-opacity-explorer-bar active:animate-opacity-explorer-bar'
              }
            : {
                  right: 'h-screen bg-gray-600 pr-2 opacity-0 hover:animate-opacity-explorer-bar active:animate-opacity-explorer-bar'
              };

    const enable = parent === 'r' ? { left: true } : { right: true };

    return (
        <div className={`absolute top-0 flex h-screen w-screen ${parent === 'r' ? 'right-0 justify-end' : 'left-0 justify-start'}`}>
            <Resizable
                defaultSize={{ width: CodeEditorDimensionsStorage.get()?.explorerBar?.width || 250, height: '100vh' }}
                minWidth={150}
                maxWidth='80%'
                enable={enable}
                handleStyles={handleStyles}
                handleClasses={handleClasses}
                onResize={onResize}
                onResizeStart={onResizeStart}
                onResizeStop={onResizeStop}>
                <div id='inner-sidebar' className={`z-50 h-screen border-gray-400/50 bg-slate-800/70 ${parent === 'r' ? 'border-l' : 'border-r'}`}>
                    <div onDragStart={onDragStart} onDragEnd={onDragEnd} draggable className='w-full px-6 py-4'>
                        <h2 className='font-jetbrains_mono text-lg font-bold tracking-tight'>Explorer</h2>
                    </div>
                </div>
            </Resizable>
        </div>
    );
};

export default ExplorerBar;
