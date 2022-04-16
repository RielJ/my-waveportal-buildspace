import clsx from 'clsx'
import React from 'react'

interface BackdropProps {
  className?: string
  show?: string | null | boolean
}

export const Backdrop: React.FC<BackdropProps> = ({ className, show }) => {
  const rootClassName = clsx('__popup__bg__position', show ? 'block ' : 'z-0 hidden', className)

  return (
    <div
      style={{
        backdropFilter: `blur(10px)`,
        background: `rgba(0, 0, 0, 0.75)`,
      }}
      className={rootClassName}
    />
  )
}
