import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from '../componets/NavBar'
import OptionBar from '../componets/OptionBar'
import { useEffect, useState } from 'react'
import getTreeService from '../services/files/getTreeService'
import { loginUser } from '../reducers/userReducer'
import ItemRow from '../componets/ItemRow'
import FolderRow from '../componets/FolderRow'

export default function Home() {
  const stateLanguage = useSelector(state => state.languege)
  const stateUser = useSelector(state => state.user)
  console.log(stateUser)
  const dispatch = useDispatch()
  console.log(stateLanguage)
  const [mytree, setTree] = useState([])
  useEffect(() => {
    console.log("Home")
    let idSesion = localStorage.getItem("idsesion");
    let user = localStorage.getItem("user");
    console.log(user)
    dispatch(loginUser(user, idSesion))



  }, [])
  useEffect(() => {

    getTreeService(stateUser.user, stateUser.idSesion, "/").then(data => {
      console.log("respeusta")
      console.log(data.tree)
      setTree(data.tree)
    })

  }, [stateUser])

  return (
    <div className={styles.container}>
      <Head>
        <title>filebox</title>
        <meta name="description" content="filebox save your file on cloud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OptionBar />

      <div>filebox222</div>
      <div>{stateLanguage}</div>
      <div>{stateUser.user}</div>
      <div>{stateUser.idSesion}</div>
      {mytree?.map(data => {
        const mycomponent = (data.indexOf(".") > -1) ? <FolderRow description={data} key={data}></FolderRow> : <ItemRow description={data} key={data}></ItemRow>
        return (
          mycomponent
        )
      })}
    </div>
  )

}
