import { useEffect, useState } from 'react';

import { MOVIE_RANDOM_URL } from '@/config';

import axiosInstance from '@/services/axiosInstance';

export const useGetRandomMovie = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<unknown | null>(null);

  const fetch = async () => {
    setIsLoading(true);
    await axiosInstance(MOVIE_RANDOM_URL, { method: 'get' })
      .then(response => {
        console.log('response', response.data);
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetch();
  }, []);

  return { isLoading, error, data };
};
