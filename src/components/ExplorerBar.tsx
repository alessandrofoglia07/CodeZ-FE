import React from 'react';
import { Resizable } from 're-resizable';

const ExplorerBar: React.FC = () => {
    return (
        <div className='flex'>
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
                    right: 'h-screen absolute top-0 right-0 bg-gray-400/50 opacity-0 hover:opacity-100 active:opacity-100 transition-opacity duration-300'
                }}>
                <div className='h-screen bg-slate-800/70'>Hello world</div>
            </Resizable>
        </div>
    );
};

export default ExplorerBar;
