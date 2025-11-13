import React from 'react';

export type TargetAttributeType = '_blank' | '_self' | '_parent' | '_top';

export enum VariantEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  QUATERNARY = 'quaternary',
}

export type TCustomStyleProps = React.CSSProperties | Record<string, string>;
