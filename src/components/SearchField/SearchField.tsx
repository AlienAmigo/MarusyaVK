import React from 'react';
import classNames from 'classnames';

import st from './SearchField.module.scss';

export interface ISearchFieldProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
}

export const SearchField: React.FC<ISearchFieldProps> = ({ className }) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };
  const classes = classNames(st.SearchField, className);

  return (
    <form method={'POST'} className={classes} onSubmit={handleSubmit}>
      <input type="text" className={st.SearchField__input} placeholder={'Поиск'} />
    </form>
  );
};
