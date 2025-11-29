// src/views/Register.tsx
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Link, useNavigate } from 'react-router-dom';

import { CustomInput, CustomInputIconEnum } from '@components/ui/CustomInput';
import { Button } from '@components/ui/Button';
import { AuthRegModal } from '@components/AuthRegModal';

import st from './Register.module.scss';

import { useAuth } from '@hooks/api/useAuth';

import { VariantEnum } from '@/types';
import { routesEnum } from '@/routes';

export interface IRegisterProps {
  className?: string;
}

const Register: React.FC<IRegisterProps> = ({ className }) => {
  const classes = classNames(st.Register, className);
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    passwordCheck: '',
  });

  const [validationError, setValidationError] = useState('');

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
      [name]: value,
    }));
    if (error || validationError) {
      clearError();
      setValidationError('');
    }
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.passwordCheck) {
      setValidationError('Пароли не совпадают');
      return false;
    }
    if (formData.password.length < 6) {
      setValidationError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    return true;
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await register({
        email: formData.email,
        name: formData.name,
        surname: formData.surname,
        password: formData.password,
        passwordCheck: formData.passwordCheck,
      }).unwrap();
      // Навигация произойдет автоматически благодаря useEffect
    } catch (error) {
      // Ошибка обрабатывается в slice
    }
  };

  const displayError = error || validationError;

  return (
    <>
      <h1 className={'visually-hidden'}>Регистрация</h1>
      <AuthRegModal className={classes}>
        <form
          method="post"
          onSubmit={handleOnSubmit}
          className={st.Register__form}
          aria-label={'Форма регистрации'}
        >
          {displayError && (
            <div className={st.Register__error} role="alert">
              {displayError}
            </div>
          )}

          <CustomInput
            required
            className={st.Register__input}
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
            className={st.Register__input}
            icon={CustomInputIconEnum.MAN}
            type={'text'}
            id={'name'}
            name={'name'}
            value={formData.name}
            onChange={handleInputChange}
            placeholder={'Имя'}
            aria-label={'Поле ввода имени'}
            disabled={isLoading}
          />
          <CustomInput
            required
            className={st.Register__input}
            icon={CustomInputIconEnum.MAN}
            type={'text'}
            id={'surname'}
            name={'surname'}
            value={formData.surname}
            onChange={handleInputChange}
            placeholder={'Фамилия'}
            aria-label={'Поле ввода фамилии'}
            disabled={isLoading}
          />
          <CustomInput
            required
            className={st.Register__input}
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
          <CustomInput
            required
            className={st.Register__input}
            icon={CustomInputIconEnum.PASSWORD}
            type={'password'}
            id={'password-check'}
            name={'passwordCheck'}
            value={formData.passwordCheck}
            onChange={handleInputChange}
            placeholder={'Подтвердите пароль'}
            aria-label={'Поле подтверждения пароля'}
            disabled={isLoading}
          />
          <Button
            variant={VariantEnum.SECONDARY}
            className={st.Register__submit}
            type="submit"
            disabled={isLoading}
            aria-label={'Кнопка создания аккаунта'}
          >
            {isLoading ? 'Создание...' : 'Создать аккаунт'}
          </Button>
          <Link
            to={routesEnum.AUTH}
            className={st.Register__auth}
            aria-label={'Ссылка на страницу авторизации'}
          >
            У меня есть пароль
          </Link>
        </form>
      </AuthRegModal>
    </>
  );
};

export default Register;
