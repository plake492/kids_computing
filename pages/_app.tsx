import '../styles/index.scss'
import Nav from '../components/Nav'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Nav />
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
