import React from 'react';
import classNames from 'classnames';

import st from './SocialButton.module.scss';

export interface ISocialButtonProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
}

export const SocialButton: React.FC<ISocialButtonProps> = ({ href, icon, className }) => {
  const classes = classNames(st.SocialButton, className);

  return (
    <a href={href} target={'_blank'} className={classes}>
      <span className={st['SocialButton__icon-wrapper']}>{icon}</span>
    </a>
  );
};
