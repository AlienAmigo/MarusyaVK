import { useEffect } from 'react';
import { useFetch } from '@hooks/useFetch';
import { MOVIE_BY_ID_URL } from '@/config';

export const useGetMovieById = (id?: number) => {
  const { state, fetch, refetch } = useFetch(id ? MOVIE_BY_ID_URL(id) : '');

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id, fetch]);

  return { ...state, refetch };
};
