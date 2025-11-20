import React from 'react';
import classNames from 'classnames';

// components
import { MovieDetails } from '@components/MovieDetails';

// hooks
import { useGetMovieById } from '@hooks/api/useGetMovieById';
import { useParams } from 'react-router-dom';

import st from './Film.module.scss';
import { Loader } from '@components/ui/Loader';
import { AboutFilm } from '@components/AboutFilm';

export interface IFilm {
  className?: string;
}

const Film: React.FC<IFilm> = ({ className }) => {
  const classes = classNames(st.Film, className);

  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetMovieById(id ? +id : undefined);

  return (
    <div className={classes}>
      <h1 className={'visually-hidden'}>{data?.title || ''}</h1>
      {isLoading ? (
        <Loader stretch />
      ) : data ? (
        <>
          <MovieDetails {...data} fullInfo />
          <AboutFilm {...data} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Film;
