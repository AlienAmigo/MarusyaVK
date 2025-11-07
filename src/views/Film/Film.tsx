import React from 'react';
import classNames from 'classnames';

import st from './Film.module.scss';

export interface IFilm {
  className?: string;
}

const Film: React.FC<IFilm> = ({ className }) => {
  const classes = classNames(st.Film, className);

  return <div className={classes}>Film</div>;
};

export default Film;
