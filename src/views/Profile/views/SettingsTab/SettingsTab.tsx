import React from 'react';
import classNames from 'classnames';

import { Button } from '@components/ui/Button';
import MailImg from './assets/mail.svg?react';

import { useAuth } from '@hooks/api/useAuth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store';
import { VariantEnum } from '@/types';
import { routesEnum } from '@/routes';

import st from './SettingsTab.module.scss';

export interface ISettingsTabProps {
  className?: string;
}

const SettingsTab: React.FC<ISettingsTabProps> = ({ className }) => {
  const classes = classNames(st.SettingsTab, className);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleOnLogout = async () => {
    try {
      await logout();
      navigate(routesEnum.HOME);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const { user } = useSelector((state: RootState) => state.auth);

  const { name, surname, email } = user || {};

  const userInitials = ((name?.[0] || '') + (surname?.[0] || '')).toUpperCase();

  return (
    <div className={classes}>
      <section className={st['SettingsTab__info']}>
        <div className={st['SettingsTab__info-item']}>
          <span className={st.SettingsTab__icon}>{userInitials}</span>
          <span className={st.SettingsTab__field}>Имя Фамилия</span>
          <span className={st.SettingsTab__value}>
            {(name || '') + (surname ? ' ' + surname : '')}
          </span>
        </div>
        <div className={st['SettingsTab__info-item']}>
          <span className={st.SettingsTab__icon}>
            <MailImg />
          </span>
          <span className={st.SettingsTab__field}>Электронная почта</span>
          <span className={st.SettingsTab__value}>{email || ''}</span>
        </div>
      </section>
      <Button className={st.SettingsTab__logout} variant={VariantEnum.SECONDARY} onClick={handleOnLogout}>
        Выйти из аккаунта
      </Button>
    </div>
  );
};
export default SettingsTab;
