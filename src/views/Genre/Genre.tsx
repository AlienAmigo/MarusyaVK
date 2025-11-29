import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { Loader } from '@components/ui/Loader';
import { MovieCard } from '@components/MovieCard';
import { PageTitle } from '@components/ui/PageTitle';
import { Button } from '@components/ui/Button';

import { useParams } from 'react-router-dom';
import { useGetMovie } from '@hooks/api/useGetMovie';

import { uppercaseFirstChar } from '@helpers';

import { IMovie, VariantEnum } from '@/types';

import st from './Genre.module.scss';

export interface IGenre {
  className?: string;
}

const Genre: React.FC<IGenre> = ({ className }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { genre } = useParams();

  // Получаем данные для текущей страницы
  const { data: newData, isLoading } = useGetMovie({
    page: currentPage,
    genre: genre,
  });

  const [allMovies, setAllMovies] = useState<IMovie[]>([]);

  const classes = classNames(st.Genre, className);

  useEffect(() => {
    if (newData && newData.length > 0) {
      setAllMovies(prev => {
        const uniqueNewMovies = newData.filter(
          newMovie => !prev.some(existingMovie => existingMovie.id === newMovie.id)
        );
        return [...prev, ...uniqueNewMovies];
      });
    }
  }, [newData]);

  const handleOnClickMoreBtn = () => setCurrentPage(prev => prev + 1);

  const titleText = uppercaseFirstChar(genre);

  return (
    <section className={classes}>
      <PageTitle enableBackButton>
        {titleText}
      </PageTitle>

      {isLoading && allMovies.length === 0 ? (
        <Loader stretch />
      ) : allMovies.length > 0 ? (
        <ul className={st.Genre__list}>
          {allMovies.map(item => (
            <li key={item.id}>
              <MovieCard {...item} />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}

      {isLoading && allMovies.length > 0 && <Loader className={st['Genre__more-btn']} />}

      {newData?.length && !isLoading ? (
        <Button
          className={st['Genre__more-btn']}
          variant={VariantEnum.SECONDARY}
          onClick={handleOnClickMoreBtn}
        >
          Показать ещё
        </Button>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Genre;
