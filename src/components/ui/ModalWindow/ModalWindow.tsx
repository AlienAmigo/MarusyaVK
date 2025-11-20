import React, { useRef } from 'react';
import { createPortal } from 'react-dom';

// components
import CloseImg from './assets/close.svg?react';

// types
import { ModalWindowThemeEnum } from '@components/ui/ModalWindow/types';

// hooks
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { useEventListener } from '@hooks/useEventListener';

import classNames from 'classnames';

export interface IModalWindowProps extends React.PropsWithChildren {
  closeModal?: () => void;
  className?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
  enableCloseByOutsideClick?: boolean;
  enableCloseOnEscapeKeydown?: boolean;
  theme?: ModalWindowThemeEnum;
}

import st from './ModalWindow.module.scss';

export const ModalWindow: React.FC<IModalWindowProps> = ({
  children,
  closeModal = () => {},
  className,
  bodyClassName,
  enableCloseByOutsideClick = true,
  enableCloseOnEscapeKeydown,
  theme = ModalWindowThemeEnum.BASIC,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEventListener('keydown', (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && enableCloseOnEscapeKeydown) {
      closeModal();
    }
  });

  useOnClickOutside(
    modalRef as React.RefObject<HTMLElement>,
    enableCloseByOutsideClick ? closeModal : undefined
  );

  const wrapperClasses = classNames(st.modalWindow, st[`modalWindow--theme--${theme}`]);
  const windowClasses = classNames(st.modalWindow__window, className);
  const bodyClasses = classNames(st.modalWindow__body, bodyClassName);

  return createPortal(
    <div className={wrapperClasses}>
      <div className={windowClasses} ref={modalRef}>
        <button className={st['modalWindow__close-btn']} onClick={closeModal}>
          <CloseImg className={st['modalWindow__close-icon']} />
        </button>
        <div className={bodyClasses}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
