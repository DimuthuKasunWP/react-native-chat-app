import { useLayoutEffect, useRef } from 'react'


export function useUpdateLayoutEffect(
  effect: () => void,
  dependencies: any[] = [],
) {
  const isInitialMount = useRef(true)

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
  }, dependencies)
}
