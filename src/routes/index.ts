export enum basicRoutesEnum {
  HOME = '/',
  GENRES = '/genres',
  GENRE = '/genre',
  FILM = '/film',
  PROFILE = '/profile',
  AUTH = '/auth',
  REGISTER = '/register',
}

export enum routesEnum {
  HOME = basicRoutesEnum.HOME,
  GENRES = basicRoutesEnum.GENRES,
  GENRE = `${basicRoutesEnum.GENRE}/:genre`,
  FILM = `${basicRoutesEnum.FILM}/:id`,
  PROFILE = basicRoutesEnum.PROFILE,
  AUTH = basicRoutesEnum.AUTH,
  REGISTER = basicRoutesEnum.REGISTER,
}
