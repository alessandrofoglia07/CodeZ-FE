import { isAxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';

const handleErr = (err: unknown, setState: Dispatch<SetStateAction<string | undefined>>) => {
    if (isAxiosError(err)) {
        const errData = err.response?.data;
        setState(typeof errData === 'string' ? errData : errData.message || 'An error occurred');
    } else if (err instanceof Error) {
        setState(err.message);
    } else if (typeof err === 'string') {
        setState(err);
    } else {
        setState('An error occurred');
    }
};

export default handleErr;
