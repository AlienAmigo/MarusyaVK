import React from 'react';
import classNames from 'classnames';

import st from './Genre.module.scss';

export interface IGenre {
  className?: string;
}

const Genre: React.FC<IGenre> = ({ className }) => {
  const classes = classNames(st.Genre, className);

  return <div className={classes}></div>;
};

export default Genre;
