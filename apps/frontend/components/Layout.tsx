import React, { ReactNode, useLayoutEffect } from 'react'
import clsx from 'clsx'
import { useCtx } from './AppProvider'
import { Backdrop } from './ui/Backdrop'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  const {
    state: { pageLoading, backdrop },
  } = useCtx()

  // locking the page from scrolling when its loading
  useLayoutEffect((): (() => void) => {
    if (pageLoading.isLoading) {
      const originalStyle: string = window.getComputedStyle(document.body).overflow

      document.body.style.overflow = 'hidden'
      return () => (document.body.style.overflow = originalStyle)
    }
    return () => document.body.style.overflow
  }, [pageLoading.isLoading])

  return (
    <main className={clsx(className, '!overflow-x-hidden')}>
      <>
        <Backdrop show={pageLoading.isLoading || backdrop} />
        {pageLoading.isLoading && (
          <div className="fixed top-0 left-0 flex justify-center items-center z-max w-full h-full flex-col space-y-5">
            <div
              className={clsx(
                'ease-linear rounded-full border-6 border-t-8 border-gray-200 h-11 w-11 animate-spin',
              )}
              style={{
                borderTopColor: '#ff3e51',
                WebkitAnimation: 'spinner 1.5s linear infinite',
                animation: 'spinner 1.5s linear infinite',
              }}
            />
            {pageLoading.text && (
              <p className="text-floralWhite font-semibold lg:text-xl text-base">
                {pageLoading.text}
              </p>
            )}
          </div>
        )}
      </>
      {children}
    </main>
  )
}
