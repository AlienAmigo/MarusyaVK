import React from 'react';
import classNames from 'classnames';

import { Button } from '@components/ui/Button';
import LikeImg from './assets/like.svg?react';
import LikeActiveImg from './assets/likeActive.svg?react';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';

import { routesEnum } from '@/routes';
import { VariantEnum } from '@types';

import st from './LikeButton.module.scss';
import { addToFavorites, removeFromFavorites } from '@store/slices/favoritesSlice';

export interface ILikeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  movieId?: number;
  isLiked?: boolean;
}

export const LikeButton: React.FC<ILikeButtonProps> = ({ movieId, isLiked, className }) => {
  const classes = classNames(st.LikeButton, className);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleOnClick = () => {
    if (isAuthenticated) {
      if (movieId) {
        if (isLiked) {
          dispatch(removeFromFavorites(movieId));
        } else {
          dispatch(addToFavorites(movieId));
        }
      }
    } else {
      navigate(routesEnum.AUTH);
    }
  };

  return (
    <Button className={classes} isIcon variant={VariantEnum.PRIMARY} onClick={handleOnClick}>
      {isLiked ? <LikeActiveImg /> : <LikeImg />}
    </Button>
  );
};
