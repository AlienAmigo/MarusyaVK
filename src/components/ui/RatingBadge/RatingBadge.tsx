import React from 'react';
import classNames from 'classnames';

import StarImg from './assets/star.svg?react';

import { TCustomStyleProps } from '@/types';
import { RatingBadgeThemeEnum } from './types';

import st from './RatingBadge.module.scss';

export interface IRatingBadgeProps {
  className?: string;
  rating: number;
  theme?: RatingBadgeThemeEnum;
}

export const RatingBadge: React.FC<IRatingBadgeProps> = ({
  rating,
  theme = RatingBadgeThemeEnum.BASIC,
  className,
}) => {
  const ratingFixed = rating ? Number(+rating.toFixed(1)) : rating;

  const setBGColor = () => {
    if (ratingFixed >= 8) {
      return 'var(--cl-rating-gold)';
    }
    if (ratingFixed >= 6.5) {
      return 'var(--cl-rating-green)';
    }
    if (ratingFixed >= 5) {
      return 'var(--cl-rating-grey)';
    }
    return 'var(--cl-rating-red)';
  };

  const customStyleProps: TCustomStyleProps = {
    ['--rating-badge-custom-bg-color']: setBGColor(),
  };

  const classes = classNames(
    st.RatingBadge,
    { [st[`RatingBadge--theme--${theme}`]]: theme },
    className
  );

  return (
    <div className={classes} style={customStyleProps}>
      <StarImg className={st.RatingBadge__icon} />
      {ratingFixed.toFixed(1).toString()}
    </div>
  );
};
