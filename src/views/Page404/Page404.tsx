import React from 'react';
import classNames from 'classnames';

import st from './Page404.module.scss';

export interface IPage404 {
  className?: string;
}

const Page404: React.FC<IPage404> = ({ className }) => {
  const classes = classNames(st.Page404, className);

  return <div className={classes}>404 Ups-s-s...</div>;
};

export default Page404;
