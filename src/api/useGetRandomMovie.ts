import { useEffect } from 'react';
import { useFetch } from '@hooks/useFetch';
import { MOVIE_RANDOM_URL } from '@/config';

export const useGetRandomMovie = () => {
  const { state, fetch, refetch } = useFetch(MOVIE_RANDOM_URL);

  useEffect(() => {
    fetch();
  }, []);

  return { ...state, fetch, refetch };
};
