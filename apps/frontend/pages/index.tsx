import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import abi from '@artifacts/WavePortal.sol/WavePortal.json'
import { BigNumber, ethers } from 'ethers'
import { WavePopUpContainer } from 'components/WavePopUpContainer'
import { useCtx } from 'components/AppProvider'
import Button from 'components/ui/Button'

interface IWave {
  address: string
  message: string
  timestamp: string
}

const Home: NextPage = () => {
  const {
    action: { setBackdrop },
  } = useCtx()
  const [currentAccount, setCurrentAccount] = useState<any>('')
  const [totalWaves, setTotalWaves] = useState(0)
  const [waves, setWaves] = useState<IWave[]>([])
  const [popUp, setPopUp] = useState(false)
  const [loading, setLoading] = useState(false)

  const contractAddress = '0x5F136B6878491A2b6a9D8Cf42ed5e6E6477cDdAC'
  const contractABI = abi.abi

  const checkIfWalletIsConnected = async () => {
    try {
      /*
       * First make sure we have access to window.ethereum
       */
      const { ethereum } = window

      if (!ethereum) {
        console.log('Make sure you have metamask!')
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account!', account)
        setCurrentAccount(account)
      } else {
        console.log('No authorized account found')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('Get Metamask!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err)
    }
  }

  const getAllWaves = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)
        const _waves = await wavePortalContract.getAllWaves()

        setWaves(
          _waves.map((wave: any) => ({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          })),
        )
      } else {
        console.log('Ethereum object does not exist.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getTotalWaves = async () => {
    const { ethereum } = window
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const wavePortalContract = new ethers.Contract(contractAddress, contractABI, provider)
      const count = await wavePortalContract.getTotalWaves()
      setTotalWaves(count.toNumber())
      return count
    } else {
      console.log('Ethereum object does not exist.')
      return BigNumber.from(0)
    }
  }

  const wave = async (message: string) => {
    try {
      setLoading(true)
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

        let count = await getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())

        const waveTxn = await wavePortalContract.wave(message)
        console.log('Mining...', waveTxn.hash)

        await waveTxn.wait()

        count = await getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())
      } else {
        console.log('Ethereum object does not exist.')
      }
      alert('Waved!')
    } catch (err) {
      console.log(err)
      alert('Error! You have failed to wave!')
    } finally {
      setLoading(false)
      setBackdrop(false)
    }
  }

  const init = async () => {
    try {
      setLoading(true)
      await Promise.all([checkIfWalletIsConnected(), getTotalWaves()])
      if (currentAccount) {
        await getAllWaves()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    init()
  }, [])

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col space-y-4 text-center">
        <div className="text-3xl">👋 Hey there!</div>

        <div className="text-base text-gray-600">
          I am{' '}
          <em>
            <b>RielJ</b>
          </em>{' '}
          and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum
          wallet and wave at me!
        </div>

        <div>
          Total Waves: <span className="italic font-bold">{totalWaves}</span>
        </div>

        <Button
          onClick={() => {
            setPopUp(true)
            setBackdrop(true)
          }}
          disabled={loading}
        >
          Wave at Me
        </Button>

        {!currentAccount && (
          <Button onClick={connectWallet} disabled={loading}>
            Connect Wallet
          </Button>
        )}

        {waves.map((wave, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: 'OldLace', marginTop: '16px', padding: '8px' }}
            >
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>
          )
        })}
      </div>
      {popUp && <WavePopUpContainer wave={wave} setPopUp={setPopUp} loading={loading} />}
    </div>
  )
}

export default Home
