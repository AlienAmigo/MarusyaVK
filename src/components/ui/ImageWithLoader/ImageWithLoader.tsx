import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { Loader } from '@components/ui/Loader';

import st from './ImageWithLoader.module.scss';

export interface IImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLElement> {
  errorMsg?: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const ImageWithLoader: React.FC<IImageWithLoaderProps> = ({
  className,
  errorMsg = 'Не удалось загрузить изображение',
  src = '',
  fallback = 'Изображение недоступно',
  ...imgProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Сбрасываем состояние при изменении src
  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const classes = classNames(
    st.ImageWithLoader,
    { [st['ImageWithLoader--loading']]: isLoading },
    className
  );

  // Если нет src, показываем сообщение
  if (!currentSrc) {
    return <span className={st.ImageWithLoader__error}>{fallback}</span>;
  }

  return (
    <div className={classes}>
      {isLoading && <Loader stretch />}
      {hasError ? (
        <span className={st.ImageWithLoader__error}>{errorMsg}</span>
      ) : (
        <img
          className={classes}
          src={currentSrc}
          alt={imgProps.alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      )}
    </div>
  );
};
