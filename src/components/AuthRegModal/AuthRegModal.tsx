import React from 'react';
import classNames from 'classnames';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { ModalWindow } from '@components/ui/ModalWindow';
import { Logo, LogoThemeEnum } from '@components/ui/Logo';

import { routesEnum } from '@/routes';

import st from './AuthRegModal.module.scss';

export interface IAuthRegModalProps extends React.PropsWithChildren {
  className?: string;
}

export const AuthRegModal: React.FC<IAuthRegModalProps> = ({ className, children }) => {
  const classes = classNames(st.AuthRegModal, className);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnClose = () => {
    if (location.state?.from || document.referrer !== '' || window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(routesEnum.HOME);
    }
  };

  return (
    <ModalWindow
      className={classes}
      bodyClassName={st.AuthRegModal__body}
      closeModal={handleOnClose}
      enableCloseByOutsideClick={false}
      enableCloseOnEscapeKeydown={false}
    >
      <Link to={routesEnum.HOME} className={st.AuthRegModal__logo}>
        <Logo theme={LogoThemeEnum.LIGHT} className={st['AuthRegModal__logo-img']} />
      </Link>
      {children}
    </ModalWindow>
  );
};
