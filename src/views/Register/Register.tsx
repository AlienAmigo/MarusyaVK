import React from 'react';
import classNames from 'classnames';

import st from './Register.module.scss';
import { AuthRegModal } from '@components/AuthRegModal';
import { CustomInput, CustomInputIconEnum } from '@components/ui/CustomInput';
import { Button } from '@components/ui/Button';
import { VariantEnum } from '@/types';
import { Link } from 'react-router-dom';
import { routesEnum } from '@/routes';

export interface IRegisterProps {
  className?: string;
}

const Register: React.FC<IRegisterProps> = ({ className }) => {
  const classes = classNames(st.Register, className);

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
          className={st.Register__form}
          aria-label={'Форма регистрации'}
        >
          <CustomInput
            required
            className={st.Register__input}
            icon={CustomInputIconEnum.EMAIL}
            type={'email'}
            id={'email'}
            name={'email'}
            placeholder={'Электронная почта'}
            aria-label={'Поле ввода электронной почты'}
          />
          <CustomInput
            required
            className={st.Register__input}
            icon={CustomInputIconEnum.MAN}
            type={'text'}
            id={'name'}
            name={'name'}
            placeholder={'Имя'}
            aria-label={'Поле ввода имени'}
          />
          <CustomInput
            required
            className={st.Register__input}
            icon={CustomInputIconEnum.MAN}
            type={'text'}
            id={'second-name'}
            name={'second-name'}
            placeholder={'Фамилия'}
            aria-label={'Поле ввода фамилии'}
          />
          <CustomInput
            className={st.Register__input}
            icon={CustomInputIconEnum.PASSWORD}
            type={'password'}
            id={'password'}
            name={'password'}
            placeholder={'Пароль'}
            aria-label={'Поле ввода пароля'}
          />
          <CustomInput
            className={st.Register__input}
            icon={CustomInputIconEnum.PASSWORD}
            type={'password-check'}
            id={'password-check'}
            name={'password'}
            placeholder={'Подтвердите пароль'}
            aria-label={'Поле ввода пароля'}
          />
          <Button
            variant={VariantEnum.SECONDARY}
            className={st.Register__submit}
            aria-label={'Кнопка входа'}
          >
            Создать аккаунт
          </Button>
          <Link
            to={routesEnum.AUTH}
            className={st.Register__auth}
            aria-label={'Ссылка на страницу регистрации'}
          >
            У меня есть пароль
          </Link>
        </form>
      </AuthRegModal>
    </>
  );
};

export default Register;
