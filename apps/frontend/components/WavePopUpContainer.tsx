import { useOutsideClick } from '@utils/hooks'
import React, { Dispatch, FormEvent, ReactElement, SetStateAction, useRef } from 'react'
import Button from './ui/Button'
import { PopupContainer } from './ui/PopUpContainer'

interface WavePopUpContainerProps {
  setPopUp: Dispatch<SetStateAction<boolean>>
  wave: (message: string) => Promise<void>
  loading: boolean
}

export const WavePopUpContainer = ({
  setPopUp,
  wave,
  loading,
}: WavePopUpContainerProps): ReactElement => {
  const sectionRef = useRef(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  useOutsideClick(sectionRef, { setState: setPopUp })
  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      console.log({ inputRef }, inputRef.current?.value)
      await wave(inputRef.current?.value!)
    } catch (err) {
      console.log({ err })
    } finally {
      setPopUp(false)
    }
  }
  return (
    <PopupContainer sectionRef={sectionRef}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-5">
          <div className="text-xl text-white">Glad you wanted to wave!</div>
          <textarea ref={inputRef} className="input_field" placeholder="Enter your message" />
          <Button type="submit" loading={loading}>
            Wave
          </Button>
        </div>
      </form>
    </PopupContainer>
  )
}
