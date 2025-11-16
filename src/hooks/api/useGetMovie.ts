import { useEffect } from 'react';
import { useFetch } from '@hooks/useFetch';

import { MOVIE_URL } from '@/config';

import { IMovie } from '@/types';

export const useGetMovie = (
  params: {
    count?: number;
    page?: number;
    title?: string;
    genre?: string;
  } = {}
) => {
  const { state, fetch, refetch } = useFetch<IMovie>(MOVIE_URL, {
    params: params,
  });

  useEffect(() => {
    fetch();
  }, [params.count, params.page, params.title, params.genre, fetch]);

  return { ...state, refetch };
};
