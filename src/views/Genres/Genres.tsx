import React, { useState } from 'react';
import classNames from 'classnames';

import axiosInstance from '@/services/axiosInstance';

import { Loader } from '@components/ui/Loader';
import { GenreCard } from '@components/GenreCard';

import { useGetMovieGenres } from '@hooks/api/useGetMovieGenres';
import { useGetMovie } from '@hooks/api/useGetMovie';

import { MOVIE_URL } from '@/config';

import st from './Genres.module.scss';

export interface IGenres {
  className?: string;
}

export interface IGenrePosters {
  genre: string;
  imgUrl: string;
}

const Genres: React.FC<IGenres> = ({ className }) => {
  const [genrePosters, setGenrePosters] = useState<IGenrePosters[]>([]);

  const classes = classNames(st.Genres, className);

  const { data: genresList, isLoading } = useGetMovieGenres();
  // const { data } = useGetMovie({count: 1, genre: 'action'});

  // console.log('genres', data);

  // if (genresList && genresList.length) {
  //   const postersArr: IGenrePosters[] = [];
  //   genresList.forEach(item => {
  //
  //     axiosInstance
  //       .get(MOVIE_URL, {
  //         params: {
  //           count: 1,
  //           genre: item,
  //         },
  //       })
  //       .then(result => result.data)
  //       .then(result => {
  //         postersArr.push({ genre: item, imgUrl: result.backdropUrl });
  //
  //         console.log('postersArr', postersArr);
  //       })
  //       .catch(err => console.log(err))
  //       .finally(() => setGenrePosters(postersArr));
  //   });
  // }

  // console.log('Genres', genresList);


  return isLoading ? (
    <Loader stretch />
  ) : (
    <section className={classes}>
      <h1 className={st.title}>Жанры фильмов</h1>
      <ul className={st.Genres__list}>
        {genresList ? (
          genresList.map((item: string, index) => (
            <li key={index} className={st['Genres__list-item']}>
              <GenreCard genre={item} imgUrl={genrePosters?.[item as string] || ''} />
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
