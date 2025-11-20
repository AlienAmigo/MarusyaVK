
import React from 'react';
import classNames from 'classnames';

import st from './Register.module.scss';

export interface IRegisterProps {
  className?: string;
}

const Register: React.FC<IRegisterProps> = ({
                                                     className,
                                                   }) => {
  const classes = classNames(st.Register, className);

  return (
    <div className={classes}>Register</div>
  );
};

export default Register;
