import React from 'react';
import classNames from 'classnames';

import st from './Loader.module.scss';

export interface ILoaderProps {
  className?: string;
}

export const Loader: React.FC<ILoaderProps> = ({ className }) => {
  const classes = classNames(st.Loader, className);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="30"
      height="30"
      // style="shape-rendering: auto; display: block; background: rgba(255, 255, 255, 0);"
    >
      <g data-idx="1">
        <circle
          strokeDasharray="141.37166941154067 49.12388980384689"
          r="30"
          strokeWidth="10"
          stroke="#ffffff"
          fill="none"
          cy="50"
          cx="50"
          data-idx="2"
          transform="matrix(0.7705132597514167,0.6374239692286806,-0.6374239692286806,0.7705132597514167,43.345535473863194,-20.39686144900486)"
        ></circle>
      </g>
    </svg>
  );
};
