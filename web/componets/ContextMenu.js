import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import dowloadFileService from "../services/files/dowloadFileService";
import styles from '../styles/General.module.css'
import ModalDeleteItems from "./ModalDeleteItems";
export default function ContextMenu(props) {

    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const stateUser = useSelector(state => state.user)


    const handleContextMenu = useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            props?.setShow(true);
        },
        [setAnchorPoint]
    );

    useEffect(() => {
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    function download() {
        if (props?.items.length > 0) {
            props?.items.map((item) => {
                dowloadFileService(stateUser.user, stateUser.idSesion, item).then(data => {
                    console.log("respeusta")
                    console.log(data)
                })
            })
        }

    }
    function deleteItem(ev) {
        ev.stopPropagation()
        $("#DeleteItem").modal('show')
        console.log("contexMEnuDelete")
        if (props?.items.length > 0) {
            props?.items.map((item) => {
                console.log(item)
            })
        }

    }
    
    const DefaulView = (() => {

        return (
            <>
                <li><button onClick={(ev) => deleteItem(ev)}>delete</button></li>
                <li><button onClick={download}>download</button></li>
            </>
        )
    })

    const TrashView = (() => {

        return (
            <>
                <li><button onClick={(ev) => deleteItem(ev)}>delete</button></li>
                <li><button onClick={download}>restore</button></li>
            </>
        )
    })

    return (

        <>

            <ModalDeleteItems setNeedRealoadTree={props?.setNeedRealoadTree} filesSelect={props?.items}></ModalDeleteItems>
            <div id="idcontextmenu">
                {props?.show ? (

                    <ul
                        className={styles.contextmenu}
                        style={{
                            top: anchorPoint.y,
                            left: anchorPoint.x
                        }}
                    >
                        {(stateUser.viewTrash) ? <TrashView/>:<DefaulView/> }
                        <hr className="divider" />
                        
                    </ul>


                ) : (
                    <> </>
                )}
            </div>
        </>
    );
}
