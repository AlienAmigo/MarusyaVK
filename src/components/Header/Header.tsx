import React from 'react';
import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import { SearchField } from '@components/SearchField';
import LogoImg from './assets/logo.svg';
import GernesImg from './assets/gernes.svg?react';
import SearchImg from './assets/search.svg?react';
import UserImg from './assets/user.svg?react';

import { routesEnum } from '@/routes';

import st from './Header.module.scss';

export interface IHeader {
  className?: string;
}

export const Header: React.FC<IHeader> = ({ className }) => {
  const classes = classNames('container', st.Header, className);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    classNames(st['Header__nav-link'], { [st['Header__nav-link--active']]: isActive });
  const mainClasses = classNames('hidden-sm', st['Header__nav-list']);

  const showSearchField = () => {};

  return (
    <header className={classes}>
      <NavLink to={routesEnum.HOME} className={st['Header__logo-link']}>
        <img
          src={LogoImg}
          width={144}
          height={32}
          alt="Маруся ВК. Логотип"
          className={st.Header__logo}
        />
      </NavLink>
      <nav className={st.Header__nav}>
        <ul className={mainClasses}>
          <li className={st['Header__nav-item']}>
            <NavLink to={routesEnum.HOME} className={linkClasses}>
              <span className={st['Header__nav-item-title']}>Главная</span>
            </NavLink>
          </li>
          <li className={st['Header__nav-item']}>
            <NavLink to={routesEnum.GENRES} className={linkClasses}>
              <span className={st['Header__nav-item-title']}>Жанры</span>
              <GernesImg className={st['Header__nav-item-icon']} />
            </NavLink>
          </li>
          <button className={st['Header__nav-item-icon']} type={'button'} onClick={showSearchField}>
            <SearchImg />
          </button>
          <SearchField className={st['Header__search-field']} />
          <li className={st['Header__nav-item']}>
            <NavLink to={routesEnum.PROFILE} className={st['Header__nav-link']}>
              <span className={st['Header__nav-item-title']}>Войти</span>
              <UserImg className={st['Header__nav-item-icon']} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
