import React from 'react';
import classNames from 'classnames';

import st from './Genres.module.scss';

export interface IGenres {
  className?: string;
}

const Genres: React.FC<IGenres> = ({ className }) => {
  const classes = classNames(st.Genres, className);

  return <div className={classes}>Genres</div>;
};

export default Genres;
