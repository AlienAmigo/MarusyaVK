import React, { useState } from 'react';
import classNames from 'classnames';

import { ModalWindow, IModalWindowProps, ModalWindowThemeEnum } from '@components/ui/ModalWindow';
import { Loader } from '@components/ui/Loader';

import st from './TrailerModal.module.scss';

export interface ITrailerModalProps extends IModalWindowProps {
  className?: string;
  youTubeId: string;
}

export const TrailerModal: React.FC<ITrailerModalProps> = props => {
  const { youTubeId, className, ...windowProps } = props;

  const [isLoading, setLoading] = useState<boolean>(true);

  const videoParams = 'rel=0&amp;showinfo=0&amp;autoplay=1';
  const videoAllow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

  const videoLink = `https://www.youtube.com/embed/${youTubeId}?${videoParams}`;

  const classes = classNames(st.TrailerModal, className);
  const videoClasses = classNames(st.TrailerModal__video, {
    [st['TrailerModal__video--loading']]: isLoading,
  });

  const handleOnLoad = () => {
    setLoading(false);
  };

  return (
    <ModalWindow className={classes} {...windowProps} theme={ModalWindowThemeEnum.PREVIEW}>
      {isLoading && <Loader stretch />}
      <iframe
        className={videoClasses}
        allowFullScreen
        allow={videoAllow}
        src={videoLink}
        onLoad={handleOnLoad}
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </ModalWindow>
  );
};
