import React from 'react';
import classNames from 'classnames';

import st from './PageTitle.module.scss';
import { BackButton } from '@components/ui/BackButton';

export interface IPageTitleProps extends React.PropsWithChildren {
  tag?: React.ElementType;
  enableBackButton?: boolean;
  className?: string;
}

export const PageTitle: React.FC<IPageTitleProps> = ({
  tag,
  className,
  enableBackButton,
  children,
}) => {
  const classes = classNames(st.PageTitle, className);
  const Tag = tag || 'h1';

  return (
    <div className={classes}>
      {enableBackButton && <BackButton />}
      <Tag className={st.PageTitle__title}>{children}</Tag>
    </div>
  );
};
