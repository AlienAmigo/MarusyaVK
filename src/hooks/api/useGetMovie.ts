import { useEffect } from 'react';
import { useFetch } from '@hooks/useFetch';

import { MOVIE_URL } from '@config';

import { IMovie } from '@/types';

export const useGetMovie = (
  params: {
    count?: number;
    page?: number;
    title?: string;
    genre?: string;
  } = {},
  condition: boolean = true
) => {
  const { state, fetch, refetch, setData } = useFetch<IMovie[]>(MOVIE_URL, {
    params: params,
  });

  useEffect(() => {
    if (condition) {
      fetch();
    }
  }, [condition, params.count, params.page, params.title, params.genre, fetch]);

  return { ...state, refetch, setData};
};
