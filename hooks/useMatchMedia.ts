import { useLayoutEffect, useState } from 'react'

export const useMatchMedia = (
  query: string = '(max-width: 600px)'
): boolean => {
  const [matches, setMatches] = useState(undefined)

  useLayoutEffect(() => {
    const watchedMedia: MediaQueryList = window.matchMedia(query)

    const mediaListener = (): void => setMatches(watchedMedia.matches)

    mediaListener()

    watchedMedia.addEventListener('change', mediaListener)

    return (): void => watchedMedia.removeEventListener('change', mediaListener)
  }, [query, setMatches])

  return matches
}
