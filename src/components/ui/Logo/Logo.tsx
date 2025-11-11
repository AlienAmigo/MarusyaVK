import React from 'react';
import ReactDOMServer from 'react-dom/server';

import LogoImg from './assets/logo.svg?react';

import { LogoThemeEnum } from '@components/ui/Logo/config.ts';

export interface ILogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  theme?: LogoThemeEnum;
  className?: string;
}

export const Logo: React.FC<ILogoProps> = props => {
  const { theme = LogoThemeEnum.DARK, className, ...imgProps } = props;

  const svgString = ReactDOMServer.renderToStaticMarkup(
    <LogoImg color={theme === LogoThemeEnum.DARK ? '#ffffff' : '#000000'} />
  );
  const svgDataUri = `data:image/svg+xml;base64,${btoa(svgString)}`;

  return (
    <img
      className={className}
      src={svgDataUri}
      alt={imgProps.alt || 'Маруся ВК. Логотип'}
      {...imgProps}
    />
  );
};
