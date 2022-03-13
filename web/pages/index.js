import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from '../componets/NavBar'
import OptionBar from '../componets/OptionBar'
import { useEffect, useState } from 'react'
import getTreeService from '../services/files/getTreeService'
import { loginUser } from '../reducers/userReducer'
import ItemRow from '../componets/ItemRow'
import dowloadFileService from '../services/files/dowloadFileService'

export default function Home() {
  const stateLanguage = useSelector(state => state.languege)
  const stateUser = useSelector(state => state.user)
  console.log(stateUser)
  const dispatch = useDispatch()
  console.log(stateLanguage)
  const [mytree, setTree] = useState([])
  const [nowRoute, setNowRoute] = useState(["/"])
  useEffect(() => {
    console.log("Home")
    let idSesion = localStorage.getItem("idsesion");
    let user = localStorage.getItem("user");
    console.log(user)
    dispatch(loginUser(user, idSesion))
  }, [])
  useEffect(() => {

    getTree()

  }, [stateUser])

  function getTree() {
    getTreeService(stateUser.user, stateUser.idSesion, nowRoute[nowRoute.length - 1]).then(data => {
      console.log("respeusta")
      console.log(nowRoute)
      console.log(data.tree)
      setTree(data.tree)
    })
  }

  function onClickFolder(data) {
    console.log("folder")
    console.log(data)
    let newData = nowRoute
    newData.push(data)
    console.log(newData)
    console.log(nowRoute[nowRoute.length - 1])
    setNowRoute(newData)
    getTree()
  }
  function onClickFile(data) {
    console.log("item")
    console.log(data)
    dowloadFileService(stateUser.user, stateUser.idSesion, data).then(data => {
      console.log("respeusta")
      console.log(data)
      //data
      //var disposition = data
      //console.log(disposition);
      
    })
  }
  function onClickReturn(data) {
    if (nowRoute.length > 1) {
      console.log("return")
      let newData = nowRoute
      newData.pop()
      console.log(newData)
      console.log(data)
      getTree()
    }

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>filebox</title>
        <meta name="description" content="filebox save your file on cloud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OptionBar funtionReload ={getTree} nowRoute={nowRoute[nowRoute.length - 1]}/>

      <div>filebox222</div>
      <div>{nowRoute}</div>
      <div>{stateUser.user}</div>
      <div>{stateUser.idSesion}</div>

      {(nowRoute.length > 1) ? <ItemRow description={"anterior"} myonClick={onClickReturn} returnIco="true"></ItemRow> : ""}

      {mytree?.map(data => {
        const myFuntionOnClick = (data.indexOf(".") > -1) ? () => onClickFile(nowRoute[nowRoute.length - 1] + "/" + data) : () => onClickFolder(nowRoute[nowRoute.length - 1] + "/" + data)
        return (
          <ItemRow description={data} key={data} myonClick={myFuntionOnClick}></ItemRow>
        )
      })}
    </div>
  )

}
