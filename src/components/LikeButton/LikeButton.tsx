import React from 'react';
import classNames from 'classnames';

import st from './LikeButton.module.scss';

export interface ILikeButtonProps {
    className?: string;
}

export const LikeButton: React.FC<ILikeButtonProps> = ({
    className,
}) => {
    const classes = classNames(st.LikeButton, className);

    return (
        <div className={classes} ></div>
    );
};
