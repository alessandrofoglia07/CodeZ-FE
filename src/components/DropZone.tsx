import { Position } from '@/utils/types';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    position?: Position;
    onDrop?: (e: React.DragEvent<HTMLDivElement>, el: Position) => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>, el: Position) => void;
    isOver?: boolean;
}

const DropZone: React.FC<Props> = ({ position = 'l', onDragOver, onDrop, isOver, children }: Props) => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        onDrop && onDrop(e, position);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onDragOver && onDragOver(e, position);
    };

    return (
        <div
            id={`drop-zone-${position}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`absolute top-0 h-screen w-64 ${position === 'l' ? 'left-auto' : 'right-0'} ${isOver ? 'bg-slate-600' : 'bg-transparent'}`}>
            {children}
        </div>
    );
};

export default DropZone;
