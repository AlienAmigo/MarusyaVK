/** hooks */
import { useEffect, useState } from 'react';

export const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export const useDebounceState = <T>(delay: number): [T | undefined, (i: T) => void] => {
    const [debouncedValue, setDebouncedValue] = useState<T | undefined>(undefined);
    const [debouncedState, setDebouncedState] = useState<T | undefined>(undefined);

    useEffect(() => {
        if (debouncedValue === undefined) {
            setDebouncedState(undefined);
            return;
        }

        const handler = setTimeout(() => {
            setDebouncedState(debouncedValue);
        }, delay);

        return () => clearTimeout(handler);
    }, [debouncedValue, delay]);

    return [debouncedState, setDebouncedValue];
};
