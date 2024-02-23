import { Position } from '../types';

interface Data {
    explorerBar: {
        width: number | string;
        parent: Position | null; // 'l' | 'r' | null (null means it's not docked)
    };
    bottomBar: {
        height: number | string;
    };
}

export default class CodeEditorDimensionsStorage {
    public static set(data: Partial<Data>) {
        const current = this.get();

        if (!current) {
            localStorage.setItem('code-editor-dimensions', JSON.stringify(data));
            return;
        }

        localStorage.setItem('code-editor-dimensions', JSON.stringify({ ...current, ...data }));
    }

    public static get(): Data | null {
        const data = localStorage.getItem('code-editor-dimensions');
        if (!data) return null;
        return JSON.parse(data);
    }

    public static remove() {
        localStorage.removeItem('code-editor-dimensions');
    }
}
