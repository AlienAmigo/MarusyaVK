import { RefObject } from 'react';

/** hooks */
import { useEffect, useRef } from 'react';

export function useEventListener<TEvent>(
    eventName: string,
    handler: (event: TEvent) => void,
    element?: RefObject<any>,
    options?: boolean | AddEventListenerOptions,
) {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement = element?.current ?? window;

        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }

        const listener: typeof handler = event => savedHandler.current(event);

        targetElement.addEventListener(eventName, listener, options);

        return () => {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}
