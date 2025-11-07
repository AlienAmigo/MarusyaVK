import React from 'react';
import classNames from 'classnames';

import { Layout } from '@/layouts/Layout';

import st from './Home.module.scss';

export interface IHome {
  className?: string;
}

const Home: React.FC<IHome> = ({ className }) => {
  const classes = classNames(st.Home, className);

  return <Layout className={classes}>Home</Layout>;
};

export default Home;
