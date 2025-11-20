export interface IUser {
  name?: string;
  surname?: string;
  email?: string;
  favorites?: (string | number)[];
}

export interface IAuthInfo {
  email: string;
  password: string;
}

export interface ISuccessfulResult {
  result: boolean;
}

export interface IError {
  error: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  name?: string;
  surname?: string;
}

export interface IMovie {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  releaseDate: string;
  genres?: string[];
  plot: string;
  runtime: number;
  budget: string;
  revenue: string;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYouTubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string;
  production: string;
  awardsSummary: string;
}

export interface IApiResponse {
  code: number;
  type: string;
  message: string;
}

export interface IFavoritesBody {
  id: string;
}
