import React from 'react';
import classNames from 'classnames';

import { VariantEnum } from '@/types';

import st from './Button.module.scss';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: VariantEnum;
  isIcon?: boolean;
}

export const Button: React.FC<IButtonProps> = props => {
  const { variant = VariantEnum.PRIMARY, isIcon, className, children, ...buttonProps } = props;

  const classes = classNames(
    st.Button,
    st[`Button--variant--${variant}`],
    { [st['Button--is-icon']]: isIcon },
    className
  );

  return (
    <button {...buttonProps} className={classes} type={buttonProps.type || 'button'}>
      {children}
    </button>
  );
};
