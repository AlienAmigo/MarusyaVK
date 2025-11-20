import React from 'react';
import classNames from 'classnames';

import st from './CustomInput.module.scss';

export interface ICustomInputProps {
  className?: string;
}

export const CustomInput: React.FC<ICustomInputProps> = ({
                                                           className,
                                                         }) => {
  const classes = classNames(st.CustomInput, className);

  return (
    <div className={classes}></div>
  );
};
