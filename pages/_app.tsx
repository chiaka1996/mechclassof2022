import 'bootstrap/dist/css/bootstrap.css'
// import styles from '../Styles/Home.module.css'
import '../styles/globals.css'
import '../styles/loading.css'
import 'animate.css';
import {AuthProvider} from "../Contexts/AllContext"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <AuthProvider>
    <div>
  <Component {...pageProps} />
  </div>
  </AuthProvider>
  )
}

export default MyApp;
