import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from '../componets/NavBar'
import OptionBar from '../componets/OptionBar'
import { useEffect, useState } from 'react'
import getTreeService from '../services/files/getTreeService'
import { loginUser, setIsDeleteFiles } from '../reducers/userReducer'
import ItemRow from '../componets/ItemRow'
import dowloadFileService from '../services/files/dowloadFileService'
import ContextMenu from '../componets/ContextMenu'
import getIsFilesDeletesService from '../services/files/getIsFilesDeletesService'
import getTreeTrashService from '../services/files/getTreeTrashService'

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
  const [needRealoadTree, setNeedRealoadTree] = useState(false);
  useEffect(() => {
    console.log("Home")
    let idSesion = localStorage.getItem("idsesion");
    let user = localStorage.getItem("user");
    console.log(user)
    dispatch(loginUser(user, idSesion))
  }, [])
  useEffect(() => {
    console.log("se ejecuta la funcionXXXXXXXXXXXXXXXXXC")
    setNeedRealoadTree(false)
    getTree()

  }, [stateUser.user,stateUser.viewTrash])

  useEffect(() => {
    console.log("reload")
    setNeedRealoadTree(false)
    getTree()

  }, [needRealoadTree])
  function getTree() {
    if (stateUser.user && stateUser.user.length > 0) {
      
   
      if (stateUser.viewTrash) {
        //console.log("get arbol basura ",mtstate)
        getTreeTrashService(stateUser.user, stateUser.idSesion).then(data => {
          console.log("basura",data.tree)
          setTree(data.tree)
          setItemSelect([])
        })
      } else {
        //console.log("get arbol normal")
        getTreeService(stateUser.user, stateUser.idSesion, nowRoute[nowRoute.length - 1]).then(data => {
          setTree(data.tree)
          setItemSelect([])
        })


        getTrash()
      }
    }

  }
  function getTrash() {
    if (stateUser.user && stateUser.user.length > 0) {
      getIsFilesDeletesService(stateUser.user, stateUser.idSesion).then(data => {
        console.log("XXXXXXXXXXXXXXXXXX basura",data)
        dispatch(setIsDeleteFiles(data.isFileDeletes))
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
    let isSelect = itemSelect.find(elem => item === elem)

    console.log(item)
    if (isSelect && itemSelect.length > 0) {
      setItemContexMenu(itemSelect)
    } else {
      setItemContexMenu([item])

    }

  }
  function myDoubleClick(item) {
    let result = itemSelect.find(elem => item === elem)
    console.log(itemSelect)
    if (result) {
      setItemSelect(itemSelect.filter(elem => item !== elem))
    } else {
      setItemSelect([...itemSelect, item])
    }
  }

  return (
    <div className={styles.container} onClick={() => setShowContextMenu(false)}>
      <Head>
        <title>filebox</title>
        <meta name="description" content="filebox save your file on cloud" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContextMenu items={itemContexMenu} setNeedRealoadTree={setNeedRealoadTree} show={showContextMenu} setShow={setShowContextMenu} />
      <OptionBar funtionReload={getTree} nowRoute={nowRoute[nowRoute.length - 1]} />

      {(nowRoute.length > 1) ? <ItemRow description={"anterior"} myonClick={onClickReturn} returnIco="true"></ItemRow> : ""}

      {mytree?.map(data => {
        let routerItem = (stateUser.viewTrash) ? data : nowRoute[nowRoute.length - 1] + "/" + data
        let isSelect = itemSelect.find(elem => routerItem === elem)
        const myFuntionOnClick = (data.indexOf(".") > -1) ? () => onClickFile(routerItem) : () => onClickFolder(routerItem)
        return (
          <div key={data} onDoubleClick={() => myDoubleClick(routerItem)}>
            <ItemRow description={data}
              key={data}
              myonClick={myFuntionOnClick}
              myonContextMenu={() => myFuntionOnClickCapture(routerItem)}
              isSelect={isSelect}
            />

          </div>

        )
      })}
    </div>
  )

}
