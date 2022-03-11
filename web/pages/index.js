import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSelector,useDispatch } from 'react-redux'
import NavBar from '../componets/NavBar'
import OptionBar from '../componets/OptionBar'

export default function Home() {
  const stateLanguage = useSelector(state => state.languege)
  const stateUser = useSelector(state => state.user)
  console.log(stateUser)
  const dispatch = useDispatch()
  console.log(stateLanguage)

  return (
    <div className={styles.container}>
      <Head>
        <title>filebox</title>
        <meta name="description" content="filebox save your file on cloud" />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <OptionBar/>
      
      <div>filebox222</div>
      <div>{stateLanguage}</div>
      <div>{stateUser.user}</div>
    </div>
  )

}
