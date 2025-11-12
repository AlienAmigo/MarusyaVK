import { useFetch } from '@/services/useFetch.ts';
import { MOVIE_RANDOM_URL } from '@/config';

export const useGetRandomMovie = () => useFetch(MOVIE_RANDOM_URL);
