import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { XIcon } from '$Icons/XIcon';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { useEventListener } from '@hooks/useEventListener';
import { TCustomStyleProps } from '@/types/';

import classNames from 'classnames';

export interface IModalWindowProps {
  closeModal?: () => void;
  width?: string;
  height?: string;
  padding?: string;
  title?: string;
  className?: string;
  classNameHeader?: string;
  contentBlockClassName?: string;
  children?: React.ReactNode;
  isBehindContentBlocked?: boolean;
  allowCloseByOutsideClick?: boolean;
  enableCloseOnEscapeKeydown?: boolean;
  isNoHeader?: boolean;
}

import st from './ModalWindow.module.scss';

export const ModalWindow: React.FC<IModalWindowProps> = ({
  contentBlockClassName = '',
  children,
  width,
  height,
  padding,
  title = '',
  closeModal,
  className,
  classNameHeader,
  isBehindContentBlocked = true,
  allowCloseByOutsideClick = true,
  enableCloseOnEscapeKeydown,
  isNoHeader = false,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  if (enableCloseOnEscapeKeydown) {
    useEventListener('keydown', (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal && closeModal();
      }
    });
  }

  useOnClickOutside(modalRef, closeModal && allowCloseByOutsideClick ? closeModal : undefined);

  const wrapperClasses = classNames(st.modalWindow__wrapper, className, {
    [st['modalWindow__wrapper--non-blocking']]: !isBehindContentBlocked,
  });

  const windowClasses = classNames(st.modalWindow__window, contentBlockClassName);

  const styleProp: TCustomStyleProps = {
    ...(width ? { '--modal-width': width } : {}),
    ...(height ? { '--modal-height': height } : {}),
    ...(padding ? { '--modal-padding': padding } : {}),
  };

  return createPortal(
    <div className={wrapperClasses}>
      <div className={windowClasses} ref={modalRef} style={styleProp}>
        {!isNoHeader && (
          <div className={classNames(st.modalWindow__header, classNameHeader)}>
            <p className={st.modalWindow__title}>{title}</p>
            {closeModal && (
              <button className={st['modalWindow__close-btn']} onClick={closeModal}>
                <XIcon className="stroke-[#8686a2] hover:stroke-[#7c78da] transition-all" />
              </button>
            )}
          </div>
        )}
        <div className={st.modalWindow__body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
