import React from 'react';
import classNames from 'classnames';

import { formatDigitByClasses } from '@/helpers';

import { IMovie } from '@/types';

import st from './AboutFilm.module.scss';

export interface IAboutFilmProps extends IMovie {
  className?: string;
}

export const AboutFilm: React.FC<IAboutFilmProps> = props => {
  const { className, ...data } = props;
  const classes = classNames(st.AboutFilm, className);

  const AboutData = [
    {
      field: 'Язык оригинала',
      value: data.language,
    },
    {
      field: 'Бюджет',
      value: data.budget && `${formatDigitByClasses(data.budget)} $`,
    },
    {
      field: 'Выручка',
      value: data.revenue && `${formatDigitByClasses(data.revenue)} $`,
    },
    {
      field: 'Режиссёр',
      value: data.director,
    },
    {
      field: 'Продакшен',
      value: data.production,
    },
    {
      field: 'Награды',
      value: data.awardsSummary,
    },
  ];

  return (
    <section className={classes}>
      <h2 className={st.AboutFilm__title}>{data.title}</h2>
      <ul className={st.AboutFilm__list}>
        {AboutData.filter(item => item.value).map((item, index) => (
          <li key={index} className={st.AboutFilm__item}>
            <span className={st['AboutFilm__field-wrapper']}>
              <span className={st.AboutFilm__field}>{item.field}</span>
              <span className={st.AboutFilm__dots} />
            </span>
            <span className={st.AboutFilm__value}>{item.value || 'N/A'}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
