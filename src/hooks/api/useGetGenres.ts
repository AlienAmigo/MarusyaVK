// hooks/api/useGetMovieGenres.ts
import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axiosInstance';
import { MOVIE_GENRES_URL, MOVIE_URL } from '@/config';

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
      const postersPromises = genres.map(async genre => {
        console.log('genre', genre);
        try {
          const response = await axiosInstance.get(MOVIE_URL, {
            params: {
              count: 1,
              genre: genre,
            },
          });
          return {
            genre,
            imgUrl: response.data[0].backdropUrl || '',
          };
        } catch (error) {
          console.error(`Error fetching poster for ${genre}:`, error);
          return { genre, imgUrl: '' };
        }
      });

      const posters = await Promise.all(postersPromises);
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
