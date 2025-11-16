import { useEffect } from 'react';
import { useFetch } from '@hooks/useFetch';
import { MOVIE_GENRES_URL } from '@/config';

export const useGetMovieGenres = () => {
  const { state, fetch, refetch } = useFetch<string[]>(MOVIE_GENRES_URL);

  useEffect(() => {
    fetch();
  }, []);

  return { ...state, fetch, refetch };
};
