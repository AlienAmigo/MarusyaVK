import React from 'react';
import classNames from 'classnames';

import { useGetRandomMovie } from '@/api/useGetRandomMovie';

import st from './Home.module.scss';

export interface IHome {
  className?: string;
}

const Home: React.FC<IHome> = ({ className }) => {
  const classes = classNames(st.Home, className);
  const { data, refetch  }  = useGetRandomMovie();

  console.log('data', data);

  return <div className={classes}>
    <h1 className="visually-hidden">Главная</h1>

  </div>;
};

export default Home;
