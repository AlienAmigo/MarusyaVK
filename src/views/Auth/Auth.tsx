import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Link, useNavigate } from 'react-router-dom';
import { AuthRegModal } from '@components/AuthRegModal';
import { CustomInput, CustomInputIconEnum } from '@components/ui/CustomInput';
import { Button } from '@components/ui/Button';

import { useAuth } from '@/hooks/api/useAuth';

import { VariantEnum } from '@/types';
import { routesEnum } from '@/routes';

import st from './Auth.module.scss';

export interface IAuthProps {
  className?: string;
}

const Auth: React.FC<IAuthProps> = ({ className }) => {
  const classes = classNames(st.Auth, className);
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routesEnum.PROFILE);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData).unwrap();
      // Навигация произойдет автоматически благодаря useEffect
    } catch (error) {
      // Ошибка обрабатывается в slice
    }
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
          {error && (
            <div className={st.Auth__error} role="alert">
              {error}
            </div>
          )}

          <CustomInput
            required
            className={st.Auth__input}
            icon={CustomInputIconEnum.EMAIL}
            type={'email'}
            id={'email'}
            name={'email'}
            value={formData.email}
            onChange={handleInputChange}
            placeholder={'Электронная почта'}
            aria-label={'Поле ввода электронной почты'}
            disabled={isLoading}
          />
          <CustomInput
            required
            className={st.Auth__input}
            icon={CustomInputIconEnum.PASSWORD}
            type={'password'}
            id={'password'}
            name={'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder={'Пароль'}
            aria-label={'Поле ввода пароля'}
            disabled={isLoading}
          />
          <Button
            variant={VariantEnum.SECONDARY}
            className={st.Auth__submit}
            type="submit"
            disabled={isLoading}
            aria-label={'Кнопка входа'}
          >
            {isLoading ? 'Вход...' : 'Войти'}
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
