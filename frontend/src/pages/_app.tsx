import '../styles/globals.css'
import {AppProvider} from '../data/context/AppContext'
import {AuthPovider} from '../data/context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthPovider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthPovider>
  )
}

export default MyApp
