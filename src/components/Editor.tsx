import React, { useState, useEffect } from 'react';

interface Props {
    w: number;
    left: number;
}

const Editor: React.FC<Props> = ({ w, left }: Props) => {
    const [width, setWidth] = useState<number>(window.innerWidth / 2);
    const [editorLeft, setEditorLeft] = useState<number>(72); // 72px - Sidebar width

    useEffect(() => {
        setWidth(w);
    }, [w]);

    useEffect(() => {
        setEditorLeft(left);
    }, [left]);

    return width && editorLeft ? <div id='Editor' style={{ width, left: editorLeft }} className='fixed h-screen bg-red-500'></div> : null;
};

export default Editor;
