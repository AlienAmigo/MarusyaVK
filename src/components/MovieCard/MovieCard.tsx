import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { ImageWithLoader, IImageWithLoaderProps } from '@components/ui/ImageWithLoader';

import { basicRoutesEnum } from '@/routes';

import { MovieCardThemeEnum } from './types';

import st from './MovieCard.module.scss';

export interface IMovieCardProps extends Omit<IImageWithLoaderProps, 'id'> {
  id: number;
  posterUrl: string;
  alt?: string;
  theme?: MovieCardThemeEnum;
  className?: string;
}

export const MovieCard: React.FC<IMovieCardProps> = props => {
  const {
    id,
    posterUrl,
    alt = '',
    theme = MovieCardThemeEnum.BASIC,
    className,
    ...imgProps
  } = props;

  const movieLink = `${basicRoutesEnum.FILM}/${id}`;

  const classes = classNames(
    st.MovieCard,
    { [st['MovieCard--theme--`${theme}']]: theme },
    className
  );

  return (
    <Link to={movieLink} className={classes}>
      <ImageWithLoader className={st.MovieCard__img} src={posterUrl} alt={alt} {...imgProps} />
    </Link>
  );
};
