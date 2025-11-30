import React, { useState, useMemo, useRef } from 'react';
import classNames from 'classnames';

import { Loader } from '@components/ui/Loader';
import { SearchResultItem } from './components/SearchResultItem';
import MagnifierImg from './assets/magnifier.svg?react';
import CrossImg from './assets/cross.svg?react';

import { useGetMovie } from '@hooks/api/useGetMovie';
import { useDebounce } from '@/hooks';
import { useNavigate } from 'react-router-dom';

import { SEARCH_QUERY_DELAY } from '@config';

import { basicRoutesEnum } from '@/routes';

import st from './SearchField.module.scss';

export interface ISearchFieldProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
}

export const SearchField: React.FC<ISearchFieldProps> = ({ className }) => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const classes = classNames(st.SearchField, className);

  const navigate = useNavigate();

  const searchQuery = useDebounce(query, SEARCH_QUERY_DELAY);

  const movieParams = useMemo(() => {
    return searchQuery ? { title: searchQuery } : {};
  }, [searchQuery]);

  const { data, isLoading, setData } = useGetMovie(movieParams, !!searchQuery.length);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const clearQuery = () => {
    setQuery('');
    setData([]);
  };

  const handleOnClearQuery = () => {
    clearQuery();
    inputRef.current?.focus();
  };

  const handleOnResultItemClick = (id: number) => {
    clearQuery();
    navigate(`${basicRoutesEnum.FILM}/${id}`);
  };

  const handleOnInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.target.value);
  };

  return (
    <form method={'POST'} className={classes} onSubmit={handleSubmit}>
      {isLoading ? (
        <Loader className={st.SearchField__loader} />
      ) : (
        <MagnifierImg className={st.SearchField__magnifier} />
      )}
      <input
        ref={inputRef}
        type="text"
        className={st.SearchField__input}
        placeholder={'Поиск'}
        value={query}
        onChange={handleOnInputChange}
      />

      {!!query.length && (
        <button
          type={'button'}
          className={st['SearchField__clear-btn']}
          onClick={handleOnClearQuery}
        >
          <CrossImg />
        </button>
      )}
      {!!searchQuery.length && data?.length !== 0 && (
        <div className={st.SearchField__results}>
          <ul className={st['SearchField__results-list']}>
            {data?.map(item => (
              <li key={item.id} className={st['SearchField__results-item']}>
                <SearchResultItem {...item} onClick={() => handleOnResultItemClick(item.id)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};
