import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface IPageLoading {
  isLoading: boolean
  text?: null | string
}

interface ContextState {
  backdrop: boolean
  pageLoading: IPageLoading
}
interface ContextAction {
  setBackdrop: Dispatch<SetStateAction<boolean>>
  setPageLoading: Dispatch<SetStateAction<IPageLoading>>
}
interface ContextProps {
  state: ContextState
  action: ContextAction
}
const Store = createContext<ContextProps>({} as ContextProps)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [backdrop, setBackdrop] = useState(false)
  const [pageLoading, setPageLoading] = useState({ isLoading: false })
  const value: ContextProps = {
    state: { backdrop, pageLoading },
    action: { setBackdrop, setPageLoading },
  }
  return <Store.Provider value={value}>{children}</Store.Provider>
}
export const useCtx = (): ContextProps => useContext(Store)
