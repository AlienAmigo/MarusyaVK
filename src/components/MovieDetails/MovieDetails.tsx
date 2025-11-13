import React from 'react';
import classNames from 'classnames';

import { RatingBadge } from '@components/ui/RatingBadge';

import { formatMinutes, isCurrentLanguage } from '@/helpers';

import { IMovie } from '@/types';

import st from './MovieDetails.module.scss';

export interface IMovieDetailsProps extends Partial<IMovie> {
  className?: string;
}

export const MovieDetails: React.FC<IMovieDetailsProps> = props => {
  const {
    className,
    genres,
    id,
    language,
    originalTitle,
    plot,
    posterUrl,
    releaseYear,
    runtime,
    title,
    tmdbRating,
    trailerUrl,
  } = props;

  const classes = classNames(st.MovieDetails, className);

  const titleText = language && isCurrentLanguage(language) ? originalTitle : title;

  const runtimeText = runtime ? formatMinutes(runtime) : '';

  const genresText = genres?.join(', ');

  return (
    <div className={classes}>
      <div className={st.MovieDetails__info}>
        <div className={st.MovieDetails__header}>
          <RatingBadge rating={tmdbRating || 0} />
          <div className={st['MovieDetails__header-wrapper']}>
            <span className={st['MovieDetails__header-item']}>{releaseYear}</span>
            <span className={st['MovieDetails__header-item']}>{genresText}</span>
            <span className={st['MovieDetails__header-item']}>{runtimeText}</span>
          </div>
        </div>
        <h2 className={st.MovieDetails__title}>{titleText}</h2>
        <p className={st.MovieDetails__plot}>{plot}</p>
        <div className="buttons">

        </div>
      </div>
      <div className={st['MovieDetails__poster-wrapper']}>
        <img className={st.MovieDetails__poster} alt={title} src={posterUrl} />
      </div>
    </div>
  );
};
