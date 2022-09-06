import { useEffect, useState, useCallback, RefObject } from 'react'

interface SpacingMap {
  widthSpacing: number | undefined
  heightSpacing: number | undefined
}

interface Spacing {
  left?: string
  right?: string
  top?: string
  bottom?: string
}

interface SpacingArray {
  x: number | undefined
  y: number | undefined
}

const checkAllowedStyles = (test: string): boolean => {
  const allowedStyles: string[] = ['padding', 'margin', 'border']
  return allowedStyles.includes(test)
}

/**
 * @param el The element being observed
 * @returns SpacingMap
 */
const getSpacing = (el: Element, style: string = 'padding'): SpacingMap => {
  // Catch errors | only allow a specific set of styles
  if (!el || !checkAllowedStyles(style)) return

  const styles = getComputedStyle(el)

  const spacingList: Spacing[] = [
    { left: styles[`${style}Left`] },
    { right: styles[`${style}Right`] },
    { top: styles[`${style}Top`] },
    { bottom: styles[`${style}Bottom`] }
  ]

  return spacingList.reduce(
    (acc: SpacingMap, cur: { [key: string]: string }): SpacingMap => {
      const [key] = Object.keys(cur)
      const propFormatted = parseFloat(cur[key].replace('px', ''))

      if (key === 'left' || key === 'right')
        acc.widthSpacing = acc.widthSpacing + propFormatted || propFormatted

      if (key === 'top' || key === 'bottom')
        acc.heightSpacing = acc.heightSpacing + propFormatted || propFormatted

      return acc
    },
    {} as SpacingMap
  )
}

export const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  withSpacing?: string[] | string,
  callback?: (entry: DOMRectReadOnly) => void
) => {
  const [width, setWidth] = useState(undefined)
  const [height, setHeight] = useState(undefined)

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries)) return

      const { contentRect, target } = entries[0]

      if (withSpacing) {
        if (Array.isArray(withSpacing)) {
          const { x, y } = withSpacing.reduce(
            (acc: SpacingArray, cur: string): SpacingArray => {
              const { widthSpacing, heightSpacing } = getSpacing(target, cur)
              acc.x = acc.x + widthSpacing || widthSpacing
              acc.y = acc.y + heightSpacing || heightSpacing
              return acc
            },
            {} as SpacingArray
          )

          setWidth(contentRect.width + x)
          setHeight(contentRect.height + y)
        } else {
          const { widthSpacing, heightSpacing } = getSpacing(
            target,
            withSpacing
          )
          setWidth(contentRect.width + widthSpacing)
          setHeight(contentRect.height + heightSpacing)
        }
      } else {
        setWidth(contentRect.width)
        setHeight(contentRect.height)
      }

      if (callback) callback(contentRect)
    },
    [callback, withSpacing]
  )

  useEffect(() => {
    if (!ref.current) return

    let RO = new ResizeObserver(entries => handleResize(entries))
    RO.observe(ref.current)

    return () => {
      RO.disconnect()
      RO = null
    }
  }, [ref, handleResize])

  return { width, height }
}
