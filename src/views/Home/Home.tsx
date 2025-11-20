import React from 'react';
import classNames from 'classnames';

// components
import { MovieDetails } from '@components/MovieDetails';
import { Loader } from '@components/ui/Loader';
import { Top10Movies } from '@components/Top10Movies';

//  hooks
import { useGetRandomMovie } from '@hooks/api/useGetRandomMovie';

//  style
import st from './Home.module.scss';

export interface IHome {
  className?: string;
}

const Home: React.FC<IHome> = ({ className }) => {
  const { data, isLoading: isMovieLoading, refetch } = useGetRandomMovie();

  const classes = classNames(st.Home, className);

  return (
    <div className={classes}>
      <h1 className="visually-hidden">Главная</h1>
      <div className={st['Home__random-movie']}>
        {isMovieLoading ? (
          <Loader stretch />
        ) : data ? (
          <MovieDetails {...data} onRefresh={refetch} />
        ) : (
          <></>
        )}
      </div>
      <Top10Movies />
    </div>
  );
};

export default Home;
