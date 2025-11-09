import React from 'react';
import classNames from 'classnames';

import st from './Footer.module.scss';

export interface IFooterProps {
  className?: string;
}

export const Footer: React.FC<IFooterProps> = ({
                                                 className,
                                               }) => {
  const classes = classNames(st.Footer, className);

  return (
    <footer className={classes}></footer>
  );
};
