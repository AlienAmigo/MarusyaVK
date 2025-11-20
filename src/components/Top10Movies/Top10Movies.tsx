import React from 'react';
import classNames from 'classnames';

import { Loader } from '@components/ui/Loader';
import { MovieCard, MovieCardThemeEnum } from '@components/MovieCard';

import { useGetTop10Movies } from '@hooks/api/useGetTop10Movies';

import st from './Top10Movies.module.scss';

export interface ITop10MoviesProps {
  className?: string;
}

export const Top10Movies: React.FC<ITop10MoviesProps> = ({ className }) => {
  const { data, isLoading } = useGetTop10Movies();

  const classes = classNames(st.Top10Movies, className);

  return (
    <section className={classes}>
      <h2 className={st.Top10Movies__title}>Топ 10 фильмов</h2>
      {isLoading ? (
        <Loader stretch/>
      ) : data ? (
        <ul className={st.Top10Movies__list}>
          {data.map(item => (
            <li key={item.id} className={st['Top10Movies__list-item']}>
              <MovieCard
                id={item.id}
                posterUrl={item.posterUrl || item.posterUrl}
                alt={item.title}
                fallback={item.title}
                theme={MovieCardThemeEnum.TOP10}
              />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </section>
  );
};
