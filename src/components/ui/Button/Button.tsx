import React from 'react';
import classNames from 'classnames';

import { VariantEnum } from '@/types';

import st from './Button.module.scss';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: VariantEnum;
}

export const Button: React.FC<IButtonProps> = props => {
  const { variant = VariantEnum.PRIMARY, className, children, ...buttonProps } = props;

  const classes = classNames(st.Button, st[`Button--variant--${variant}`], className);

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
};
