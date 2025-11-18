import React, { useState } from 'react';
import classNames from 'classnames';

import { ImageWithLoader } from '@components/ui/ImageWithLoader';
import { RatingBadge } from '@components/ui/RatingBadge';
import { Button } from '@components/ui/Button';
import RefreshImg from './assets/refresh.svg?react';
import LikeImg from './assets/like.svg?react';

import { formatMinutes, isCurrentLanguage } from '@/helpers';

import { useNavigate } from 'react-router-dom';

import { basicRoutesEnum } from '@/routes';

import { IMovie, VariantEnum } from '@/types';

import st from './MovieDetails.module.scss';

export interface IMovieDetailsProps extends Partial<IMovie> {
  className?: string;
  onRefresh?: () => void;
}

export const MovieDetails: React.FC<IMovieDetailsProps> = props => {
  const {
    backdropUrl,
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
    onRefresh,
  } = props;

  const [showTrailerModal, setshowTrailerModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const classes = classNames(st.MovieDetails, className);

  const titleText = language && isCurrentLanguage(language) ? originalTitle : title;

  const runtimeText = runtime ? formatMinutes(runtime) : '';

  const genresText = genres?.join(', ');

  const handleOnShowTrailer = () => {};
  const handleOnShowFilmDetails = () => navigate(`${basicRoutesEnum.FILM}/${id}`);
  const handleOnLikeBtnClick = () => {};

  return (
    <section className={classes}>
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
        <div className={st.MovieDetails__buttons}>
          <Button variant={VariantEnum.SECONDARY} onClick={handleOnShowTrailer}>
            Трейлер
          </Button>
          <Button variant={VariantEnum.QUATERNARY} onClick={handleOnShowFilmDetails}>
            О фильме
          </Button>
          <Button isIcon variant={VariantEnum.PRIMARY} onClick={handleOnLikeBtnClick}>
            <LikeImg />
          </Button>
          {onRefresh && (
            <Button
              isIcon
              variant={VariantEnum.PRIMARY}
              className={'hidden-sm'}
              onClick={onRefresh}
            >
              <RefreshImg />
            </Button>
          )}
        </div>
      </div>
      <div className={st['MovieDetails__poster-wrapper']}>
        <ImageWithLoader className={st.MovieDetails__poster} alt={title} src={backdropUrl || posterUrl} />
      </div>
    </section>
  );
};
