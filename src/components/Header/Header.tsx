import React from 'react';
import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import LogoImg from './assets/logo.svg?react';

import { routesEnum } from '@/routes';

import st from './Header.module.scss';

export interface IHeader {
  className?: string;
}

export const Header: React.FC<IHeader> = ({ className }) => {
  const classes = classNames('container', st.Header, className);

  const linkClasses = ({ isActive }) => classNames(st['Header__nav-link'], {[st['Header__nav-link--active']]: isActive});

  return (
    <header className={classes}>
      <NavLink to={routesEnum.HOME}>
        <LogoImg className={st.Header__logo} />
      </NavLink>
      <nav className={st.Header__nav}>
        <ul className={st['Header__nav-list']}>
          <li className={st['Header__nav-item']}>
            <NavLink to={routesEnum.HOME} className={linkClasses}>
              Главная
            </NavLink>
          </li>
          <li className={st['Header__nav-item']}>
            <NavLink to={routesEnum.GENRES} className={linkClasses}>
              Жанры
            </NavLink>
          </li>
          <li className={st['Header__nav-item']}>
            <NavLink to={routesEnum.PROFILE} className={st['Header__nav-link']}>
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
