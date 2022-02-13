import '../styles/globals.css'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import storeReducer from '../reducers/userReducer'
import { userReducer } from '../reducers/userReducer'
import { languageReducer } from '../reducers/languageReducer'
import Head from 'next/head'

const reducer = combineReducers({
  user: userReducer,
  languege: languageReducer
})

const store = createStore(reducer)

function MyApp({ Component, pageProps }) {
  return (

    <>
      <Head>
        <script
          defer
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
          crossOrigin="anonymous"
        />


      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>

    </>

  )
}

export default MyApp
