import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import { routesEnum } from '@/routes';

import st from './Header.module.scss';

export interface IHeader {
  className?: string;
}

export const Header: React.FC<IHeader> = ({ className }) => {
  const classes = classNames(st.Header, className);

  return (
    <div className={classes}>
      <Link to={routesEnum.HOME}></Link>
      <nav className={st.Header__nav}>
        <ul className={st['Header__nav-list']}>
          <li className={st['Header__nav-item']}>
            <Link to={routesEnum.HOME} className={st['Header__nav-link']}>
              Главная
            </Link>
          </li>
          <li className={st['Header__nav-item']}>
            <Link to={routesEnum.GENRES} className={st['Header__nav-link']}>
              Жанры
            </Link>
          </li>
          <li className={st['Header__nav-item']}>
            <Link to={routesEnum.PROFILE} className={st['Header__nav-link']}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
