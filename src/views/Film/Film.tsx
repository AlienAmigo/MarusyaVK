import React from 'react';
import classNames from 'classnames';

// components


// hooks
import { useGetMovieById } from '@hooks/api/useGetMovieById';
import { useParams } from 'react-router-dom';

import st from './Film.module.scss';

export interface IFilm {
  className?: string;
}

const Film: React.FC<IFilm> = ({ className }) => {
  const classes = classNames(st.Film, className);

  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetMovieById(id ? +id : undefined);

  console.log(data);

  return <div className={classes}>Film</div>;
};

export default Film;
