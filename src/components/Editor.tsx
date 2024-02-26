import React, { useState, useEffect } from 'react';

interface Props {
    w: number | string;
    h: number | string;
    left: number;
}

const Editor: React.FC<Props> = ({ w, h, left }: Props) => {
    const [width, setWidth] = useState<number | string>(window.innerWidth - 56);
    const [height, setHeight] = useState<number | string>(window.innerHeight);
    const [editorLeft, setEditorLeft] = useState<number>(56); // 56px - Sidebar width

    useEffect(() => {
        setWidth(w);
    }, [w]);

    useEffect(() => {
        setEditorLeft(left);
    }, [left]);

    useEffect(() => {
        setHeight(h);
    }, [h]);

    return width && editorLeft ? <div id='Editor' style={{ width, height, left: editorLeft }} className='fixed h-screen'></div> : null;
};

export default Editor;
