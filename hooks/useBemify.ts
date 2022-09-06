import { useMemo } from 'react'
import { conditionalClasses } from '../utils/helpers'

// Some quick helper methods
const isString = (v: any): boolean => typeof v === 'string'
const isBool = (v: any): boolean => typeof v === 'boolean'
const isArray = (v: any): boolean => Array.isArray(v)
const formatClass = (v: string): string => (v.startsWith('--') ? v : `__${v}`)

const bemify =
  (block: string): Function =>
  /**
   * Use this encolsed function to construct classes based on the BEM naming convention
   * @param element string
   * @param classes ..rest: string | []
   *     STRING: if passing a string, the string wil be added to the block and element as either an additional element
   *     `block__element__extra-element`, or will add the string as a modifier `block__element--modified`
   *     ARRAY if passing an array, there are two possible outcomes:
   *         1. An array starting with a boolean condition will check that condition and returm the string at
   *            arr[1] if true, or an optional fallback value at arr[2], which defaults to ''.
   *         2. An array of any length containing strings will add those strings to the
   *            output class `nav__button disabled light `
   * @returns String
   */
  (
    element: string | undefined,
    ...classes: ((string | boolean | (string | undefined))[][] | string[])[]
  ) => {
    // We combine the block and element or return the block itself
    let combined: string = element ? `${block}__${element}` : block
    let formedClasses: string

    if (classes && classes.length) {
      // Sort the classes params based on multiple conditions
      const [conditionals, additionalElements, additionalClasses]: [
        (string | boolean | (string | undefined))[][],
        string[],
        string[][]
      ] = classes.reduce(
        (acc: any, cur: any): [][][] => {
          if (isArray(cur))
            if (isString(cur[0])) acc[2] = [...acc[2], cur]
            else if (isBool(cur[0])) acc[0] = [...acc[0], cur]
          if (isString(cur)) acc[1] = [...acc[1], formatClass(cur)]
          return acc
        },
        [[], [], []]
      )

      if (conditionals.length)
        formedClasses = conditionalClasses(
          ...conditionals.filter(
            ([b, v1, v2 = '']) => isBool(b) && isString(v1) && isString(v2)
          )
        )
      if (additionalElements.length) combined += additionalElements.join('')
      if (additionalClasses.length)
        combined += additionalClasses.map(
          // Add spaces to start, end, and replace commas with space
          (classArr: string[]) =>
            ` ${classArr
              .filter(v => isString(v))
              .join(',')
              .replace(/,/g, ' ')} `
        )
    }
    // Combine the classes
    return [combined, formedClasses].join(' ')
  }

/**
 * This is a helpful utility function that makes class concatenation in react easier
 * Calling the bemify function returns a function with the Block value accessible via closures
 * @param block
 * @returns Function
 */
export const useBemify = (block: string) =>
  useMemo((): Function => bemify(block), [block])
