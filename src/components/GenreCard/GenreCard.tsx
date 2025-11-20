import React from 'react';
import classNames from 'classnames';

import { ImageWithLoader } from '@components/ui/ImageWithLoader';
import { Link } from 'react-router-dom';

import { basicRoutesEnum } from '@/routes';

import st from './GenreCard.module.scss';

export interface IGenreCardProps {
  genre: string;
  imgUrl: string;
  className?: string;
}

export const GenreCard: React.FC<IGenreCardProps> = ({ genre, imgUrl, className }) => {
  const classes = classNames(st.GenreCard, className);

  return (
    <Link to={`${basicRoutesEnum.GENRE}/${genre}`} className={classes}>
      <div className={st.GenreCard__img}>
        <ImageWithLoader src={imgUrl} />
      </div>
      <span className={st.GenreCard__title}>{genre}</span>
    </Link>
  );
};
