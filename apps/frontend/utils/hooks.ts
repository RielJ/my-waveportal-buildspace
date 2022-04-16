import { useCtx } from 'components/AppProvider'
import { Dispatch, RefObject, SetStateAction, useEffect, useLayoutEffect } from 'react'

export function useLockBodyScroll(): void {
  useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(document.body).overflow

    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = originalStyle)
  }, [])
}

export const useOutsideClick = (
  ref: RefObject<Element>,
  action: { setState?: Dispatch<SetStateAction<any>>; dispatch?: any },
) => {
  const {
    action: { setBackdrop },
  } = useCtx()

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (action?.setState) {
          action.setState(false)
          setTimeout(() => setBackdrop(false), 200)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
