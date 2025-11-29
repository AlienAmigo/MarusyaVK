import React, { useEffect } from 'react';
import classNames from 'classnames';

import { Loader } from '@components/ui/Loader';
import { MovieCard } from '@components/MovieCard';
import CrossImg from './assets/cross.svg?react';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';

import { fetchFavorites, removeFromFavorites } from '@store/slices/favoritesSlice';

import st from './FavoritesTab.module.scss';

export interface IFavoritesTabProps {
  className?: string;
}

const FavoritesTab: React.FC<IFavoritesTabProps> = ({ className }) => {
  const classes = classNames(st.FavoritesTab, className);

  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, error } = useSelector((state: RootState) => state.favorites);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuthenticated]);


  return (
    <div className={classes}>
      {isLoading ? (
        <Loader stretch />
      ) : (
        <ul className={st.FavoritesTab__wrapper}>
          {items.map(item => (
            <li key={item.id} className={st.FavoritesTab__item}>
              <MovieCard {...item} />
              <button className={st['FavoritesTab__remove-btn']} onClick={() => removeFromFavorites(item.id)}>
                <CrossImg />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesTab;
