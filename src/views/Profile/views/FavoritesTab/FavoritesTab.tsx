import React from 'react';
import classNames from 'classnames';

import st from './FavoritesTab.module.scss';

export interface IFavoritesTabProps {
  className?: string;
}

const FavoritesTab: React.FC<IFavoritesTabProps> = ({ className }) => {
  const classes = classNames(st.FavoritesTab, className);

  return <div className={classes}>Избранное</div>;
};

export default FavoritesTab;
