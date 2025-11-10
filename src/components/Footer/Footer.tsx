import React from 'react';
import classNames from 'classnames';

import { SocialButton } from '@components/ui/SocialButton';

import { footerConfig } from './config/';

import st from './Footer.module.scss';

export interface IFooterProps {
  className?: string;
}

export const Footer: React.FC<IFooterProps> = ({ className }) => {
  const classes = classNames('container', st.Footer, className);

  return (
    <footer className={classes}>
      {footerConfig.map((item, index) => (
        <SocialButton key={index} href={item.href} icon={<item.icon />} />
      ))}
    </footer>
  );
};
