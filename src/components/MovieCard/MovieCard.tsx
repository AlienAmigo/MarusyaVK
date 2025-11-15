import React, { useState } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Loader } from '@components/ui/Loader';

import { basicRoutesEnum } from '@/routes';

import st from './MovieCard.module.scss';

export interface IMovieCardProps {
  id: number;
  posterUrl: string;
  alt: string;
  className?: string;
}

export const MovieCard: React.FC<IMovieCardProps> = ({ id, posterUrl, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const movieLink = `${basicRoutesEnum}/${id}`;

  const classes = classNames(st.MovieCard, className);
  const imgClasses = classNames(st.MovieCard__img, { [st['MovieCard__img--loading']]: isLoading });

  return (
    <Link to={movieLink} className={classes}>
      {isLoading && <Loader stretch />}
      {hasError ? (
        <span className={st.MovieCard__error}>Не удалось загрузить изображение</span>
      ) : (
        <img
          className={imgClasses}
          src={posterUrl}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </Link>
  );
};
