import { useEffect } from 'react';
import { useFetch } from '@hooks/useFetch';
import { FAVORITES_URL } from '@config';

import { IMovie } from '@/types';

export const useGetFavorites = () => {
  const { state, fetch, refetch } = useFetch<IMovie[]>(FAVORITES_URL);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch };
};
