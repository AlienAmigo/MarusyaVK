import React from 'react';
import classNames from 'classnames';

import st from './Loader.module.scss';

export interface ILoaderProps {
  className?: string;
  fit?: boolean;
}

export const Loader: React.FC<ILoaderProps> = ({ fit, className }) => {
  const classes = classNames(st.Loader, { [st['Loader--fit']]: fit }, className);

  return (
    <div className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="30"
        height="30"
        className={st.Loader__spinner}
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
            transform="matrix(-0.8090205947034411,0.5877802968335112,-0.5877802968335112,-0.8090205947034411,119.84004457684762,61.062014893496496)"
          ></circle>
          <g data-idx="4"></g>
        </g>
      </svg>
    </div>
  );
};
