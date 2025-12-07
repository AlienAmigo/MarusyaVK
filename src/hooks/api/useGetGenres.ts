import { useState, useEffect } from 'react';
import axiosInstance from '@services/axiosInstance';
import { MOVIE_GENRES_URL, MOVIE_URL } from '@config';

export interface IGenrePosters {
  genre: string;
  imgUrl: string;
}

export const useGetGenres = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [genresList, setGenresList] = useState<string[] | null>(null);
  const [genrePosters, setGenrePosters] = useState<IGenrePosters[]>([]);
  const [isLoadingPosters, setIsLoadingPosters] = useState<boolean>(false);

  // Функция для получения списка жанров
  const fetchGenres = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<string[]>(MOVIE_GENRES_URL);
      setGenresList(response.data);
      return response.data;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для получения постеров жанров
  const fetchGenrePosters = async (genres: string[]) => {
    if (!genres || genres.length === 0) return;

    setIsLoadingPosters(true);

    try {
      const usedPosters = new Set<string>();
      const posters: IGenrePosters[] = [];

      // Обрабатываем жанры последовательно
      for (const genre of genres) {

        try {
          // Запрашиваем несколько фильмов за раз
          const response = await axiosInstance.get(MOVIE_URL, {
            params: {
              count: 10, // Запрашиваем 10 фильмов вместо 1
              genre: genre,
            },
          });

          const movies = response.data || [];

          // Ищем первый уникальный постер среди полученных фильмов
          const uniqueMovie = movies.find((movie: any) =>
            movie?.backdropUrl && !usedPosters.has(movie.backdropUrl)
          );

          if (uniqueMovie?.backdropUrl) {
            // Нашли уникальный постер
            usedPosters.add(uniqueMovie.backdropUrl);
            posters.push({
              genre,
              imgUrl: uniqueMovie.backdropUrl
            });
          } else if (movies.length > 0 && movies[0]?.backdropUrl) {
            // Если не нашли уникальный, берем первый доступный (даже если дублируется)
            posters.push({
              genre,
              imgUrl: movies[0].backdropUrl
            });
          }
        } catch (error) {
          console.error(`Error fetching posters for ${genre}:`, error);
        }
      }

      setGenrePosters(posters);
    } catch (error) {
      console.error('Error fetching genre posters:', error);
    } finally {
      setIsLoadingPosters(false);
    }
  };

  // Основная функция для получения данных
  const fetchAllData = async () => {
    const genres = await fetchGenres();
    if (genres) {
      await fetchGenrePosters(genres);
    }
  };

  // Функция для перезапроса
  const refetch = async () => {
    await fetchAllData();
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    data: genresList,
    genrePosters,
    isLoading: isLoading || isLoadingPosters,
    isLoadingGenres: isLoading,
    isLoadingPosters,
    error,
    refetch,
    fetchGenres,
    fetchGenrePosters,
  };
};
