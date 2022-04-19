import clsx from 'clsx'
import { motion } from 'framer-motion'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  loading?: boolean
  disabled?: boolean
  hidden?: boolean
  color?: 'primary' | 'secondary'
  _style?: 'outlined' | 'fill'
}
const Button = forwardRef<HTMLButtonElement, any>((props, ref) => {
  const {
    className,
    children,
    active,
    loading = false,
    disabled = false,
    color = 'primary',
    _style = 'fill',
    hidden,
    ...rest
  } = props

  const rootClassName = clsx(
    'outline-none text-white lg:text-lg text-xs 2xl:px-16 rounded-lg xl:px-8 lg:px-10  px-5 py-5 xl:py-3 2xl:py-3 font-bold transition-all duration-150 lg:w-auto w-full relative',
    color === 'primary' && _style === 'fill' && 'bg-blue-500',
    // color === 'primary' && _style === 'outlined' && styles.border_gradient,
    color === 'secondary' && 'bg-persianBlue',
    // styles.button,
    loading && 'cursor-not-allowed',
    disabled && 'cursor-not-allowed hover:cursor-not-allowed brightness-75',
    hidden ? 'hidden' : 'block',
    className,
  )

  return (
    <motion.button
      whileHover={{
        scale: `${!disabled && 1.02}`,
        // duration: 0.4,
        transition: { ease: 'easeInOut', duration: 0.2 },
      }}
      transition={{
        delay: 0.1,
      }}
      type="button"
      aria-pressed={active}
      ref={ref}
      className={rootClassName}
      disabled={disabled}
      {...rest}
    >
      {loading && (
        <div className="transfrom left-[5%] top-1/2 absolute -translate-y-1/2">
          <div className="animate-spin h-5 rounded-full w-5 border-t-[3px] border-b-[3px] border-purple-500" />
        </div>
      )}
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button
