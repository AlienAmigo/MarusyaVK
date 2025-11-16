import React from 'react';
import classNames from 'classnames';

import { ImageWithLoader } from '@components/ui/ImageWithLoader';
import { Link } from 'react-router-dom';

import st from './GenreCard.module.scss';
import { basicRoutesEnum } from '@/routes';

export interface IGenreCardProps {
  genre: string;
  imgUrl: string;
  className?: string;
}

export const GenreCard: React.FC<IGenreCardProps> = ({ genre, imgUrl, className }) => {
  const classes = classNames(st.GenreCard, className);

  return (
    <Link to={`${basicRoutesEnum.GENRE}/{genre}`} className={classes}>
      <ImageWithLoader className={st.GenreCard__img} src={imgUrl} />
      <span className={st.GenreCard__title}>{genre}</span>
    </Link>
  );
};
