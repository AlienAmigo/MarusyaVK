import { useFetch } from '@hooks/useFetch';
import { MOVIE_RANDOM_URL } from '@/config';
import { useEffect } from 'react';

export const useGetRandomMovie = () => {
  const { state, fetch } = useFetch(MOVIE_RANDOM_URL);

  useEffect(() => {
    fetch();
  }, []);

  return state;
};
