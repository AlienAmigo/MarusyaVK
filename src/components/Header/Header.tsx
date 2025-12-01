import React, { useState } from 'react';
import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import { SearchField } from '@components/SearchField';
import { Logo } from '@components/ui/Logo';
import GenresImg from './assets/gernes.svg?react';
import SearchImg from './assets/search.svg?react';
import UserImg from './assets/user.svg?react';

import { routesEnum } from '@/routes';

import st from './Header.module.scss';

import { useAuth } from '@hooks/api/useAuth.ts';

export interface IHeader {
  className?: string;
}

export const Header: React.FC<IHeader> = ({ className }) => {
  const { isAuthenticated, user } = useAuth();
  const [searchFieldMobileVisible, setSearchFieldMobileVisible] = useState<boolean>(false);

  const classes = classNames('container', st.Header, className);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    classNames(st['Header__nav-link'], { [st['Header__nav-link--active']]: isActive });
  const mainClasses = classNames('hidden-sm', st['Header__nav-list']);

  const searchFieldClasses = classNames(st['Header__search-field'], {
    [st['Header__search-field--visible-sm']]: searchFieldMobileVisible,
  });

  const toggleSearchFieldBtnClasses = classNames(st['Header__nav-item-icon'], {
    [st['Header__nav-item-icon--active']]: searchFieldMobileVisible,
  });

  const toggleSearchField = () =>
    searchFieldMobileVisible
      ? setSearchFieldMobileVisible(false)
      : setSearchFieldMobileVisible(true);

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname.startsWith(routesEnum.PROFILE)) {
      e.preventDefault();
    }
  };

  return (
    <header className={classes}>
      <NavLink to={routesEnum.HOME} className={st['Header__logo-link']}>
        <Logo width={144} height={32} className={st.Header__logo} />
      </NavLink>
      <nav className={st.Header__nav}>
        <ul className={mainClasses}>
          <li className={classNames(st['Header__nav-item'], st['Header__nav-item--hidden-sm'])}>
            <NavLink to={routesEnum.HOME} className={linkClasses}>
              <span className={st['Header__nav-item-title']}>Главная</span>
            </NavLink>
          </li>
          <li className={st['Header__nav-item']}>
            <NavLink to={routesEnum.GENRES} className={linkClasses}>
              <span className={st['Header__nav-item-title']}>Жанры</span>
              <GenresImg className={st['Header__nav-item-icon']} />
            </NavLink>
          </li>
          <button
            className={toggleSearchFieldBtnClasses}
            type={'button'}
            onClick={toggleSearchField}
          >
            <SearchImg />
          </button>
          <SearchField
            className={searchFieldClasses}
            toggleSearchField={() => setSearchFieldMobileVisible(false)}
          />
          <li className={st['Header__nav-item']}>
            {isAuthenticated ? (
              <NavLink
                to={routesEnum.PROFILE}
                end={false}
                onClick={handleProfileClick}
                className={linkClasses}
              >
                <span className={st['Header__nav-item-title']}>{user?.name || 'Профиль'}</span>
                <UserImg className={st['Header__nav-item-icon']} />
              </NavLink>
            ) : (
              <NavLink to={routesEnum.AUTH} className={st['Header__nav-link']}>
                <span className={st['Header__nav-item-title']}>Войти</span>
                <UserImg className={st['Header__nav-item-icon']} />
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
