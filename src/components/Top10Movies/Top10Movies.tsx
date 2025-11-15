import React from 'react';
import classNames from 'classnames';

import st from './Top10Movies.module.scss';

export interface ITop10MoviesProps {
  className?: string;
}

export const Top10Movies: React.FC<ITop10MoviesProps> = ({
                                                           className,
                                                         }) => {
  const classes = classNames(st.Top10Movies, className);

  return (
    <div className={classes}></div>
  );
};
