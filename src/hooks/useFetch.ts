import { useEffect, useState, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';
import axiosInstance from '@/services/axiosInstance';

export const useFetch = <T = unknown>(url: string = '', props: AxiosRequestConfig = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetch = useCallback(async () => {
    if (!url) return; // Не делаем запрос если URL пустой

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance(url, {
        method: 'get',
        ...props,
      });
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [url, JSON.stringify(props)]); // Зависимости для useCallback


  // Функция для ручного перезапроса
  const refetch = useCallback(() => {
    fetch();
  }, []);

  return { state: { isLoading, error, data }, fetch, refetch };
};
