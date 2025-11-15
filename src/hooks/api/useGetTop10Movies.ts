import { useEffect } from 'react';
import { useFetch } from '@hooks/useFetch';
import { MOVIE_TOP_10_URL } from '@/config';

export const useGetTop10Movies = () => {
  const { state, fetch, refetch } = useFetch(MOVIE_TOP_10_URL);

  useEffect(() => {
    fetch();
  }, []);

  return { ...state, fetch, refetch };
};
