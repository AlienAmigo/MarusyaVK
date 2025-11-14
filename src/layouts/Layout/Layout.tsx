import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

import st from './Layout.module.scss';

export interface ILayoutProps extends React.PropsWithChildren {
  className?: string;
}

export const Layout: React.FC<ILayoutProps> = ({ className, children }) => {
  const classes = classNames(st.Layout, className);
  const mainClasses = classNames(st.Layout__main, 'container');

  return (
    <div className={classes}>
      <Header />
      <main className={mainClasses}>
        <Outlet context={children} />
      </main>
      <Footer />
    </div>
  );
};
