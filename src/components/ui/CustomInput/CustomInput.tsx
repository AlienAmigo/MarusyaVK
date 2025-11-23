import React from 'react';
import classNames from 'classnames';

import MailImg from './assets/mail.svg?react';
import ManImg from './assets/man.svg?react';
import PasswordImg from './assets/pass.svg?react';

import { CustomInputIconEnum } from './types';

import st from './CustomInput.module.scss';

export interface ICustomInputProps extends React.HTMLProps<HTMLInputElement> {
  icon?: CustomInputIconEnum;
  className?: string;
  errorMsg?: string;
}

export const CustomInput: React.FC<ICustomInputProps> = props => {
  const { className, icon, errorMsg, ...inputProps } = props; // Исправлено здесь

  const classes = classNames(st.CustomInput, /*{[st['CustomInput--error']]: },*/ className);

  const iconElement: { [key in CustomInputIconEnum]: React.ReactNode } = {
    [CustomInputIconEnum.EMAIL]: <MailImg />,
    [CustomInputIconEnum.MAN]: <ManImg />,
    [CustomInputIconEnum.PASSWORD]: <PasswordImg />,
  };

  return (
    <div className={classes}>
      <label className={st.CustomInput__label} htmlFor={props.id}>
        <span className={st.CustomInput__icon}>
          {(icon && iconElement?.[icon]) || '4234'}
        </span>
        <input className={st.CustomInput__input} {...inputProps} />
      </label>

      {errorMsg && <span className={st.CustomInput__error}>{errorMsg}</span>}
    </div>
  );
};
