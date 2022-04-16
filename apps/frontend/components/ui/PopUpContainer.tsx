import { motion } from 'framer-motion'
import { useLockBodyScroll } from '@utils/hooks'
import React, { ReactNode, RefObject } from 'react'
import clsx from 'clsx'

interface PopupContainerProps {
  children: ReactNode
  sectionRef: RefObject<HTMLDivElement>
}

const Animate = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
}
const ease = [0.04, 0.62, 0.23, 0.98]

export const PopupContainer: React.FC<PopupContainerProps> = ({ children, sectionRef }) => {
  useLockBodyScroll()

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className={clsx(
        'fixed top-0 left-0 flex justify-center items-center z-max w-full h-full !mt-0 !z-[100]',
      )}
    >
      <motion.div
        className="__popup_container glass__gradient__thicc scrollbar scrollbar-thumb-gray scrollbar-thin"
        ref={sectionRef}
        variants={Animate}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
