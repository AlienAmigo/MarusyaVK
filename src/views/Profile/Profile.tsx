import React, { lazy } from 'react';
import classNames from 'classnames';

import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { PageTitle } from '@components/ui/PageTitle';
import { SuspenseElement } from '@components/SuspenseElement';
import { ProtectedRoute } from '@components/ProtectedRoute';

import FavoriteImg from './assets/favorite.svg?react';
import UserImg from './assets/user.svg?react';

import { profileRoutesEnum, routesEnum } from '@/routes';

import st from './Profile.module.scss';

export interface IProfile {
  className?: string;
}

const FavoritesTab = lazy(() => import('./views/FavoritesTab'));
const SettingsTab = lazy(() => import('./views/SettingsTab'));

const Profile: React.FC<IProfile> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const classes = classNames(st.Profile, className);

  const isFavoritesActive =
    location.pathname.endsWith(routesEnum.FAVORITES) ||
    location.pathname === routesEnum.PROFILE ||
    !location.pathname.endsWith(routesEnum.SETTINGS);

  const isSettingsActive = location.pathname.endsWith(routesEnum.SETTINGS);

  const handleTabClick = (tab: profileRoutesEnum) => {
    if (tab === profileRoutesEnum.FAVORITES) {
      navigate(routesEnum.SETTINGS);
    } else {
      navigate(routesEnum.FAVORITES);
    }
  };


  return (
    <div className={classes}>
      <PageTitle>Мой аккаунт</PageTitle>
      <div className={st['Profile__tabs-header']}>
        <button
          type={'button'}
          className={classNames(st.Profile__tab, {
            [st['Profile__tab--active']]: isFavoritesActive,
          })}
          onClick={() => handleTabClick(profileRoutesEnum.SETTINGS)}
        >
          <FavoriteImg />
          <span className={st['Profile__tab-text']}>Избранные фильмы</span>
          <span className={classNames(st['Profile__tab-text'], st['Profile__tab-text--sm'])}>
            Избранное
          </span>
        </button>
        <button
          type={'button'}
          className={classNames(st.Profile__tab, isSettingsActive && st['Profile__tab--active'])}
          onClick={() => handleTabClick(profileRoutesEnum.FAVORITES)}
        >
          <UserImg />
          <span className={st['Profile__tab-text']}>Настройка аккаунта</span>
          <span className={classNames(st['Profile__tab-text'], st['Profile__tab-text--sm'])}>
            Настройки
          </span>
        </button>
      </div>

      <div className={st.Profile__content}>
        <Routes>
          <Route
            path={profileRoutesEnum.FAVORITES}
            element={SuspenseElement(
              <ProtectedRoute>
                <FavoritesTab />
              </ProtectedRoute>
            )}
          />
          <Route
            path={profileRoutesEnum.SETTINGS}
            element={SuspenseElement(
              <ProtectedRoute>
                <SettingsTab />
              </ProtectedRoute>
            )}
          />
          <Route path="/" element={<Navigate to={routesEnum.FAVORITES} replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
