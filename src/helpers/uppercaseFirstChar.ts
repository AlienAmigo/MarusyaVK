export const uppercaseFirstChar = (str?: string): string =>
  str
    ?.split('')
    .map((item, index) => (index ? item : item.toUpperCase()))
    .join('') || '';
