import React from 'react';
import classNames from 'classnames';

import st from './MovieCard.module.scss';

export interface IMovieCardProps {
  className?: string;
}

export const MovieCard: React.FC<IMovieCardProps> = ({
                                                       className,
                                                     }) => {
  const classes = classNames(st.MovieCard, className);

  return (
    <div className={classes}></div>
  );
};
