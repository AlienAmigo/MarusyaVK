import React from 'react';
import classNames from 'classnames';

import st from './Button.module.scss';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: string;
}

export const Button: React.FC<IButtonProps> = ({ variant, className, children }) => {
  const classes = classNames(st.Button, className);

  return <button className={classes}>{children}</button>;
};
