import React from 'react';
import classNames from 'classnames';

import { Button } from '@components/ui/Button';

import { VariantEnum } from '@/types';

import { authService } from '@/services/authService';

import st from './SettingsTab.module.scss';

export interface ISettingsTabProps {
  className?: string;
}

const SettingsTab: React.FC<ISettingsTabProps> = ({ className }) => {
  const classes = classNames(st.SettingsTab, className);

  const handleOnLogout = () => authService.logout();

  return (
    <div className={classes}>
      <Button variant={VariantEnum.SECONDARY} onClick={handleOnLogout}>
        Выйти из аккаунта
      </Button>
    </div>
  );
};
export default SettingsTab;
