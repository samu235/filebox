import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSelector,useDispatch } from 'react-redux'

export default function Home() {
  const stateLanguage = useSelector(state => state.languege)
  const dispatch = useDispatch()
  console.log(stateLanguage)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="filebox save your file on cloud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>filebox222</div>
      <div>{stateLanguage}</div>
    </div>
  )
}
