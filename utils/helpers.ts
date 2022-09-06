// import { urlFor } from '../lib/sanity';

export const parseCSSVar = (element: any, ...props: any[]) => {
  console.log(element);
  if (typeof window !== 'undefined') {
    const computedStyle = window?.getComputedStyle(element);

    const parsedValues = {};

    props.forEach((prop) => {
      const formatted = prop.replace('--', '');
      const rawValue = computedStyle.getPropertyValue(`--${formatted}`);
      const strippedValue = rawValue.replace('px', '');
      const parsedValue = parseFloat(strippedValue);
      const key = formatted.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      parsedValues[key] = Number.isNaN(parsedValue)
        ? rawValue.trim()
        : parsedValue;
    });

    return parsedValues;
  }
};

/**
 * TODO WORK IN PROGRESS
 * @param param0
 * @returns Array of css variables
 */
export const getCssVar = ({ cssVarTarget }) => {
  type cssObj = {
    [key: string]: any;
  };

  return Array.from(document.styleSheets)
    .filter(
      (sheet) =>
        sheet.href === null || sheet.href.startsWith(window.location.origin)
    )
    .reduce(
      (acc, sheet) =>
        (acc = [
          ...acc,
          ...Array.from(sheet.cssRules).reduce(
            (def, rule: cssObj) =>
              (def =
                rule.selectorText === ':root'
                  ? [
                      ...def,
                      ...Array.from(rule.style).filter((name: string) =>
                        name.startsWith(cssVarTarget)
                      ),
                    ]
                  : def),
            []
          ),
        ]),
      []
    );
};

/**
 * A helper function for generating classes bases on a boolean condition.
 * @param rules Accepts Arrays containing a boolean condition at index[0],
 *              followed by a string value at index[1],
 *              and an optional fallback string value at index[2]
 * @returns String of values seperated by a space
 */
export const conditionalClasses = (
  ...rules: (boolean | string | (string | undefined))[][]
) =>
  rules &&
  Array.isArray(rules) &&
  rules
    .map(
      ([condition, style, fallback]: [
        boolean,
        string,
        string | undefined
      ]): string => (condition ? style : fallback || '')
    )
    .join(' ');

export const wait = (t: number) =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, t)
  );
// /**
//  * A helper function to extract the exact width and height from an image
//  * @param photo Image Object from Sanity Studio
//  * @returns Array containing [width, height]
//  */
// export const getImgSize = (photo: {}): number[] => {
//   const photoObj: string = urlFor(photo).url();
//   const dimensions: string[] = photoObj.split('-')[1].split('.')[0].split('x');
//   const width: number = parseInt(dimensions[0]);
//   const height: number = parseInt(dimensions[1]);
//   return [width, height];
// };
