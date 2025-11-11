import React from 'react';
import classNames from 'classnames';

import StarImg from './assets/star.svg?react';

import st from './RatingBadge.module.scss';

export interface IRatingBadgeProps {
  className?: string;
  value: number;
}

export const RatingBadge: React.FC<IRatingBadgeProps> = ({ value, className }) => {
  const classes = classNames(st.RatingBadge, className);

  return (
    <div className={classes}>
      <StarImg className={st.RatingBadge__icon} />
      {value}
    </div>
  );
};
