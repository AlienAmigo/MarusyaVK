import React from 'react';
import classNames from 'classnames';

// components
import { MovieDetails } from '@components/MovieDetails';
import { Loader } from '@components/ui/Loader';

//  hooks
import { useGetRandomMovie } from '@/api/useGetRandomMovie';

import st from './Home.module.scss';

export interface IHome {
  className?: string;
}

const Home: React.FC<IHome> = ({ className }) => {
  const { data, isLoading: isMovieLoading } = useGetRandomMovie();

  const classes = classNames(st.Home, className);

  console.log('data', data);

  return (
    <div className={classes}>
      <h1 className="visually-hidden">Главная</h1>
      {isMovieLoading ? <Loader /> : data ? <MovieDetails {...data} /> : <></>}
    </div>
  );
};

export default Home;
