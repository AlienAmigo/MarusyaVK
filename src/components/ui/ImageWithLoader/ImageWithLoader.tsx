import React, { useState } from 'react';
import classNames from 'classnames';

import { Loader } from '@components/ui/Loader';

import st from './ImageWithLoader.module.scss';

export interface IImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLElement> {
  errorMsg?: string;
  className?: string;
}

export const ImageWithLoader: React.FC<IImageWithLoaderProps> = ({
  className,
  errorMsg = 'Не удалось загрузить изображение',
  ...imgProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  return (
    <>
      {(isLoading || !imgProps.src) && <Loader stretch />}
      {hasError ? (
        <span className={st.MovieCard__error}>{errorMsg}</span>
      ) : (
        <img
          {...imgProps}
          className={classes}
          src={imgProps.src}
          alt={imgProps.alt}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </>
  );
};
