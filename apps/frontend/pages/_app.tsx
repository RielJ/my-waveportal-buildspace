import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from 'components/AppProvider'
import { Layout } from 'components/Layout'

declare global {
  interface Window {
    ethereum: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default MyApp
