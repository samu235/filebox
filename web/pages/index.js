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
import ContextMenu from '../componets/ContextMenu'

export default function Home() {
  const stateLanguage = useSelector(state => state.languege)
  const stateUser = useSelector(state => state.user)
  console.log(stateUser)
  const dispatch = useDispatch()
  console.log(stateLanguage)
  const [mytree, setTree] = useState([])
  const [nowRoute, setNowRoute] = useState(["/"])
  const [itemContexMenu, setItemContexMenu] = useState([])
  const [itemSelect, setItemSelect] = useState([])
  const [showContextMenu, setShowContextMenu] = useState(false);
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
    if (stateUser.user && stateUser.user.length > 0) {
      getTreeService(stateUser.user, stateUser.idSesion, nowRoute[nowRoute.length - 1]).then(data => {
        console.log("respeusta")
        console.log(nowRoute)
        console.log(data.tree)
        setTree(data.tree)
      })
    }

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
    /*
    dowloadFileService(stateUser.user, stateUser.idSesion, data).then(data => {
      console.log("respeusta")
      console.log(data)
    })
    */
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
  function myFuntionOnClickCapture(item) {
    //let element = itemContexMenu;
    console.log(item)
    setItemContexMenu([item])
  }
  function myDoubleClick (item){
    
  }

  return (
    <div className={styles.container} onClick={() => setShowContextMenu(false)}>
      <Head>
        <title>filebox</title>
        <meta name="description" content="filebox save your file on cloud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContextMenu items={itemContexMenu} show={showContextMenu} setShow={setShowContextMenu} />
      <OptionBar funtionReload={getTree} nowRoute={nowRoute[nowRoute.length - 1]} />

      {(nowRoute.length > 1) ? <ItemRow description={"anterior"} myonClick={onClickReturn} returnIco="true"></ItemRow> : ""}

      {mytree?.map(data => {
        const myFuntionOnClick = (data.indexOf(".") > -1) ? () => onClickFile(nowRoute[nowRoute.length - 1] + "/" + data) : () => onClickFolder(nowRoute[nowRoute.length - 1] + "/" + data)
        return (
          <div key={data} onDoubleClick={() => myDoubleClick(nowRoute[nowRoute.length - 1] + "/" + data)}>
            <ItemRow description={data} key={data} myonClick={myFuntionOnClick} myonContextMenu={() => myFuntionOnClickCapture(nowRoute[nowRoute.length - 1] + "/" + data)}></ItemRow>
          </div>

        )
      })}
    </div>
  )

}
