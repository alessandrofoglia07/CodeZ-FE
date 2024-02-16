import React, { PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface Props extends PropsWithChildren {
    position?: 'l' | 'r';
    id?: string;
}

const DropZone: React.FC<Props> = ({ position = 'l', children, id }: Props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id || 'drop-zone'
    });

    const style = {
        backgroundColor: isOver ? 'rgb(51 65 85 / 0.6)' : 'transparent'
    };

    return (
        <div className={`fixed top-0 -z-50 h-screen w-64 ${position === 'l' ? 'left-auto' : 'right-0'}`} style={style} ref={setNodeRef}>
            {children}
        </div>
    );
};

export default DropZone;
