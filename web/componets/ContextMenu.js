import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import dowloadFileService from "../services/files/dowloadFileService";
import styles from '../styles/General.module.css'
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
        console.log("contexMEnuDelete")
        if (props?.items.length > 0) {
            props?.items.map((item) => {
                console.log(item)
            })
        }
    }
    return (

        <><div id="idcontextmenu">
            {props?.show ? (

                <ul
                    className={styles.contextmenu}
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x
                    }}
                >
                    <li><button onClick={(ev) => deleteItem(ev)}>delete</button></li>
                    <li><button onClick={download}>download</button></li>
                    <hr className="divider" />
                    <li>Cut</li>
                    <li>Copy</li>
                    <li>Paste</li>

                    <li>Refresh</li>
                    <li>Exit</li>
                </ul>


            ) : (
                <> </>
            )}
        </div>
        </>
    );
}
