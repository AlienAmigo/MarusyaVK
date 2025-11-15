export enum basicRoutesEnum {
  HOME = '/',
  GENRES = '/genres',
  GENRE = '/genre',
  FILM = '/film',
  PROFILE = '/profile',
}

export enum routesEnum {
  HOME = basicRoutesEnum.HOME,
  GENRES = basicRoutesEnum.GENRES,
  GENRE = `${basicRoutesEnum.GENRE}/:id`,
  FILM = `${basicRoutesEnum.FILM}/:id`,
  PROFILE = basicRoutesEnum.PROFILE,
}
