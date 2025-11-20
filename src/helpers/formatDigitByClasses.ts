export const formatDigitByClasses = (num: string | number): string => {
    const findClassInDigitRegExp = /^(\d{1,3}(?:\s\d{3})*)((?:\d{3})+(?:[\,\.]\d{0,})?)$/g;

    const divideNumByClasses = (str: string) => {
        while (str.match(findClassInDigitRegExp)) {
            str = str.replace(findClassInDigitRegExp, '$1 $2');
        }
        return str;
    };

    return num.toString().trim().length
        ? divideNumByClasses(num.toString().trim())
              .replace(/(\d)[\.\,](\d*)$/g, '$1,$2')
              .replace(/^([^\,]+\,\d{3}).+$/g, '$1')
        : num.toString();
};
