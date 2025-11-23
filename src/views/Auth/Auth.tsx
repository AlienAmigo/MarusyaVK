import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import { AuthRegModal } from '@components/AuthRegModal';
import { CustomInput, CustomInputIconEnum } from '@components/ui/CustomInput';
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
    <>
      <h1 className={'visually-hidden'}>Авторизация</h1>
      <AuthRegModal className={classes}>
        <form
          method="post"
          onSubmit={handleOnSubmit}
          className={st.Auth__form}
          aria-label={'Форма входа'}
        >
          <CustomInput
            required
            className={st.Auth__input}
            icon={CustomInputIconEnum.EMAIL}
            type={'email'}
            id={'email'}
            name={'email'}
            placeholder={'Электронная почта'}
            aria-label={'Поле ввода электронной почты'}
          />
          <CustomInput
            required
            className={st.Auth__input}
            icon={CustomInputIconEnum.PASSWORD}
            type={'password'}
            id={'password'}
            name={'password'}
            placeholder={'Пароль'}
            aria-label={'Поле ввода пароля'}
          />
          <Button
            variant={VariantEnum.SECONDARY}
            className={st.Auth__submit}
            aria-label={'Кнопка входа'}
          >
            Войти
          </Button>
          <Link
            to={routesEnum.REGISTER}
            className={st.Auth__registration}
            aria-label={'Ссылка на страницу регистрации'}
          >
            Регистрация
          </Link>
        </form>
      </AuthRegModal>
    </>
  );
};

export default Auth;
