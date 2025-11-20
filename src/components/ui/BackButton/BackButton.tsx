import React from 'react';
import classNames from 'classnames';

import ChevronImg from './assets/chevron.svg?react';

import { useNavigate } from 'react-router-dom';

import st from './BackButton.module.scss';

export interface IBackButtonProps {
  className?: string;
}

export const BackButton: React.FC<IBackButtonProps> = ({ className }) => {
  const classes = classNames(st.BackButton, className);

  const navigate = useNavigate();

  return (
    <button className={classes} type={'button'} onClick={() => navigate(-1)}>
      <ChevronImg className={st.BackButton__img} />
    </button>
  );
};
