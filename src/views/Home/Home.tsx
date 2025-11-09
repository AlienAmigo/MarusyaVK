import React from 'react';
import classNames from 'classnames';

import st from './Home.module.scss';

export interface IHome {
  className?: string;
}

const Home: React.FC<IHome> = ({ className }) => {
  const classes = classNames(st.Home, className);

  return <div className={classes}>Home</div>;
};

export default Home;
