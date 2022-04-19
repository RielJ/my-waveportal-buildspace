import { shortenString } from '@utils/common'
import { formatDistance } from 'date-fns'
import makeBlockie from 'ethereum-blockies-base64'
import { HTMLMotionProps, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

interface WaveCardProps {
  wave: {
    address: string
    timestamp: Date
    message: string
  }
  props?: HTMLMotionProps<'div'>
}

export default function WaveCard({ wave, props }: WaveCardProps): ReactElement {
  const router = useRouter()
  const onClick = async () => {
    window.open(`https://rinkeby.etherscan.io/address/${wave.address}`, '_blank')
  }

  return (
    <motion.div
      onClick={onClick}
      className="shadow-xl p-6 rounded-md space-y-2"
      whileHover={{
        scale: 1.02,
        transition: { ease: 'easeInOut', duration: 0.2 },
      }}
      transition={{
        delay: 0.1,
      }}
      {...props}
    >
      <img
        className="h-auto w-full bg-white rounded-md inline-block"
        src={makeBlockie(wave.address)}
        alt="user"
      />
      <div className="flex justify-between items-end">
        <div className="text-2xl text-left">{shortenString(wave.address)}</div>
        <div className="text-sm text-left">
          Waved @ <br />
          {formatDistance(wave.timestamp, new Date(), { addSuffix: true })}
        </div>
      </div>
      <hr />
      <div>{wave.message}</div>
    </motion.div>
  )
}
