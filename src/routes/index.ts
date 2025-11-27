export enum basicRoutesEnum {
  HOME = '/',
  GENRES = '/genres',
  GENRE = '/genre',
  FILM = '/film',
  PROFILE = '/profile',
  AUTH = '/auth',
  REGISTER = '/register',
}

export enum profileRoutesEnum {
  FAVORITES = '/favorites',
  SETTINGS = '/settings',
}

export enum routesEnum {
  HOME = basicRoutesEnum.HOME,
  GENRES = basicRoutesEnum.GENRES,
  GENRE = `${basicRoutesEnum.GENRE}/:genre`,
  FILM = `${basicRoutesEnum.FILM}/:id`,
  PROFILE = basicRoutesEnum.PROFILE,
  AUTH = basicRoutesEnum.AUTH,
  REGISTER = basicRoutesEnum.REGISTER,
  FAVORITES = basicRoutesEnum.PROFILE + profileRoutesEnum.FAVORITES,
  SETTINGS = basicRoutesEnum.PROFILE + profileRoutesEnum.SETTINGS,
}
