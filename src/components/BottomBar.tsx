import CodeEditorDimensionsStorage from '@/utils/localStorage/CodeEditorDimensions';
import { Position } from '@/utils/types';
import { Resizable, ResizeCallback, ResizeStartCallback } from 're-resizable';
import React, { useEffect } from 'react';

interface Props {
    w: number | string;
    explorerParentState: Position | null;
    onResize: ResizeCallback;
    onResizeStart: ResizeStartCallback;
    onResizeStop: ResizeCallback;
}

const BottomBar: React.FC<Props> = ({ w, explorerParentState, onResize, onResizeStart, onResizeStop }: Props) => {
    const [width, setWidth] = React.useState<number | string>(w);

    useEffect(() => {
        setWidth(w);
    }, [w]);

    return (
        <div className='absolute bottom-0' style={{ width, right: explorerParentState === 'l' ? 0 : undefined, left: explorerParentState === 'r' ? 72 : undefined }}>
            <Resizable
                defaultSize={{ width: '100%', height: CodeEditorDimensionsStorage.get()?.bottomBar?.height || 280 }}
                minHeight={50}
                maxHeight='80vh'
                enable={{ top: true }}
                handleClasses={{ top: 'w-full bg-gray-600 pb-2 opacity-0 hover:animate-opacity-explorer-bar active:animate-opacity-explorer-bar !cursor-n-resize' }}
                onResize={onResize}
                onResizeStart={onResizeStart}
                onResizeStop={onResizeStop}>
                <div id='bottom-bar' className='z-50 h-full w-full border-t border-gray-400/50 bg-slate-800/70'></div>
            </Resizable>
        </div>
    );
};

export default BottomBar;
