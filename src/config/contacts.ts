export enum SocialEnum {
  VK = 'vk',
  TG = 'tg',
  OK = 'ok',
  YT = 'yt',
}

export const socialLinks: { [key in SocialEnum]: string } = {
  [SocialEnum.VK]: 'https://vk.com/marusiaproject',
  [SocialEnum.TG]: 'https://t.me/capsula_VK',
  [SocialEnum.OK]: 'https://ok.ru/group/56253920968860',
  [SocialEnum.YT]: 'https://www.youtube.com/@marusiaproject',
};
