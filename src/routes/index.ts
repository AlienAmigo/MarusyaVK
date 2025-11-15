export enum basicRoutes {
  HOME = '/',
  GENRES = '/genres',
  GENRE = '/genre',
  FILM = '/film',
  PROFILE = '/profile',
}

export enum routesEnum {
  HOME = basicRoutes.HOME,
  GENRES = basicRoutes.GENRES,
  GENRE = `${basicRoutes.GENRE}/:id`,
  FILM = `${basicRoutes.FILM}/:id`,
  PROFILE = basicRoutes.PROFILE,
}
