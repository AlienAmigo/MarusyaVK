import React from 'react';
import classNames from 'classnames';

import { ImageWithLoader } from '@components/ui/ImageWithLoader';
import { RatingBadge, RatingBadgeThemeEnum } from '@components/ui/RatingBadge';

import { IMovie } from '@types';

import st from './SearchResultItem.module.scss';
import { formatMinutes } from '@/helpers';

export interface ISearchResultItemProps extends IMovie {
  className?: string;
  onClick?: () => void;
}

export const SearchResultItem: React.FC<ISearchResultItemProps> = props => {
  const {
    className,
    onClick = () => {},
    title,
    tmdbRating,
    releaseYear,
    genres,
    runtime,
    backdropUrl,
    posterUrl,
  } = props;
  const classes = classNames(st.SearchResultItem, className);

  const runtimeText = runtime ? formatMinutes(runtime) : '';

  const genresText = genres?.join(', ');

  return (
    <div className={classes} onClick={onClick}>
      <div className={st.SearchResultItem__img}>
        <ImageWithLoader alt={title} src={posterUrl || backdropUrl} />
      </div>
      <div className={st.SearchResultItem__header}>
        <RatingBadge rating={tmdbRating} theme={RatingBadgeThemeEnum.SEARCH} />
        <span className={st['SearchResultItem__header-item']}>{releaseYear}</span>
        <span
          className={classNames(
            st['SearchResultItem__header-item'],
            st['SearchResultItem__header-item--genres']
          )}
        >
          {genresText}
        </span>
        <span className={st['SearchResultItem__header-item']}>{runtimeText}</span>
      </div>
      <p className={st.SearchResultItem__title}>{title}</p>
    </div>
  );
};
