import React from 'react';
import classNames from 'classnames';

import st from './TrailerModal.module.scss';

export interface ITrailerModalProps {
  className?: string;
  url?: string;
}

export const TrailerModal: React.FC<ITrailerModalProps> = ({
                                                             className,
                                                           }) => {
  const classes = classNames(st.TrailerModal, className);

  return (
    <div className={classes}></div>
  );
};
