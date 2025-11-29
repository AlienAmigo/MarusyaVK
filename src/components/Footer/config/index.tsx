import React from 'react';

import vkImg from '../assets/vk.svg?react';
import ytImg from '../assets/yt.svg?react';
import okImg from '../assets/ok.svg?react';
import tgImg from '../assets/tg.svg?react';

import { socialLinks } from '@config';

export const footerConfig: {
  href: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    href: socialLinks.vk,
    icon: vkImg,
  },
  {
    href: socialLinks.yt,
    icon: ytImg,
  },
  {
    href: socialLinks.ok,
    icon: okImg,
  },
  {
    href: socialLinks.tg,
    icon: tgImg,
  },
];
