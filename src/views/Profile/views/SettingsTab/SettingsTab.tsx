import React from 'react';
import classNames from 'classnames';

import { Button } from '@components/ui/Button';

import { VariantEnum } from '@/types';

import { useAuth } from '@hooks/api/useAuth';

import { routesEnum } from '@/routes';

import { useNavigate } from 'react-router-dom';

import st from './SettingsTab.module.scss';

export interface ISettingsTabProps {
  className?: string;
}

const SettingsTab: React.FC<ISettingsTabProps> = ({ className }) => {
  const classes = classNames(st.SettingsTab, className);

  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleOnLogout = async () => {
    try {
      await logout();
      navigate(routesEnum.HOME);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  return (
    <div className={classes}>
      <section className={st['SettingsTab__info']}>
        <div className={st['SettingsTab__info-item']}></div>
        <div className={st['SettingsTab__info-item']}></div>
      </section>
      <Button variant={VariantEnum.SECONDARY} onClick={handleOnLogout}>
        Выйти из аккаунта
      </Button>
    </div>
  );
};
export default SettingsTab;
