import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles/Home.module.css'
import 'animate.css';
// import {AuthProvider} from "../Contexts/AllContext"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    // <AuthProvider>
    <div className={styles.overallBody}>
  <Component {...pageProps} />
  </div>
  // </AuthProvider>
  )
}

export default MyApp;
