import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { ImageWithLoader } from '@components/ui/ImageWithLoader';

import { basicRoutesEnum } from '@/routes';

import st from './MovieCard.module.scss';

export interface IMovieCardProps {
  id: number;
  posterUrl: string;
  alt: string;
  className?: string;
}

export const MovieCard: React.FC<IMovieCardProps> = ({ id, posterUrl, alt, className }) => {
  const movieLink = `${basicRoutesEnum.FILM}/${id}`;

  const classes = classNames(st.MovieCard, className);

  return (
    <Link to={movieLink} className={classes}>
      <ImageWithLoader className={st.MovieCard__img} src={posterUrl} alt={alt} />
    </Link>
  );
};
