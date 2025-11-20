import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import { AuthRegModal } from '@components/AuthRegModal';
import { Button } from '@components/ui/Button';

import { VariantEnum } from '@/types';

import { routesEnum } from '@/routes';

import st from './Auth.module.scss';

export interface IAuthProps {
  className?: string;
}

const Auth: React.FC<IAuthProps> = ({ className }) => {
  const classes = classNames(st.Auth, className);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <AuthRegModal className={classes}>
      <form method="post" onSubmit={handleOnSubmit} className={st.Auth__form}>
        <Button variant={VariantEnum.SECONDARY} className={st.Auth__submit}>Войти</Button>
        <Link to={routesEnum.REGISTER} className={st.Auth__registration}>
          Регистрация
        </Link>
      </form>
    </AuthRegModal>
  );
};

export default Auth;
