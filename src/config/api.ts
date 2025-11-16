export const BASE_URL = 'https://cinemaguide.skillbox.cc';

// AUTH
export const AUTH_LOGIN_URL = '/auth/login';
export const AUTH_LOGOUT_URL = '/auth/logout';
export const USER_CREATE_URL = '/user';
export const PROFILE_URL = '/profile';

// FAVORITES
export const FAVORITES_URL = '/favorites';

// MOVIE
export const MOVIE_URL = '/movie';
export const MOVIE_TOP_10_URL = '/movie/top10';
export const MOVIE_GENRES_URL = '/movie/genres';
export const MOVIE_BY_ID_URL = (movieId: number) => `/movie/${movieId}`;
export const MOVIE_RANDOM_URL = '/movie/random';
