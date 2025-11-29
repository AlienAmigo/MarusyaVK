import { useEffect } from 'react';
import { useFetch } from '@hooks/useFetch';

import { MOVIE_TOP_10_URL } from '@config';
import { IMovie } from '@/types/';

export const useGetTop10Movies = () => {
  const { state, fetch, refetch } = useFetch<IMovie[]>(MOVIE_TOP_10_URL);

  useEffect(() => {
    fetch();
  }, []);

  return { ...state, fetch, refetch };
};
