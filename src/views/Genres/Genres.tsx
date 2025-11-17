import React, { useState } from 'react';
import classNames from 'classnames';

import { Loader } from '@components/ui/Loader';
import { GenreCard } from '@components/GenreCard';

import { useGetGenres } from '@hooks/api/useGetGenres';

import st from './Genres.module.scss';

export interface IGenres {
  className?: string;
}

export interface IGenrePosters {
  genre: string;
  imgUrl: string;
}

const Genres: React.FC<IGenres> = ({ className }) => {
  const classes = classNames(st.Genres, className);

  const { data: genresList, genrePosters, isLoading } = useGetGenres();

  const posterMap = genrePosters.reduce(
    (acc, item) => {
      acc[item.genre] = item.imgUrl;
      return acc;
    },
    {} as Record<string, string>
  );

  console.log('posterMap', posterMap);

  return isLoading ? (
    <Loader stretch />
  ) : (
    <section className={classes}>
      <h1 className={st.title}>Жанры фильмов</h1>
      <ul className={st.Genres__list}>
        {genresList ? (
          genresList.map((item: string, index) => (
            <li key={index} className={st['Genres__list-item']}>
              <GenreCard genre={item} imgUrl={posterMap[item] || ''} />
            </li>
          ))
        ) : (
          <Loader stretch />
        )}
      </ul>
    </section>
  );
};

export default Genres;
