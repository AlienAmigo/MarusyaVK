import { RefObject } from 'react';

/** hooks */
import { useEventListener } from '@hooks/useEventListener';

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  element: RefObject<T> | Array<RefObject<T>> | null,
  handler?: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEventListener(mouseEvent, (event: MouseEvent) => {
    if (Array.isArray(element)) {
      let isContains = false;

      for (const _element of element) {
        const _current = _element?.current;

        if (_current?.contains(event.target as Node)) {
          isContains = true;
        }
      }

      if (isContains) {
        return;
      }
    } else {
      const current = element?.current;

      if (!current || current.contains(event.target as Node)) {
        return;
      }
    }

    handler?.(event);
  });
}
