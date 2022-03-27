import { useCallback, useEffect, useState } from "react"
import styles from '../styles/General.module.css'
export default function ContextMenu(props) {

    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);

    const handleContextMenu = useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setShow(true);
        },
        [setAnchorPoint, setShow]
    );

    useEffect(() => {
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });

    return (

        <>
            {show ? (
                <ul
                    className={styles.contextmenu}
                    style={{
                        top: anchorPoint.y,
                        left: anchorPoint.x
                    }}
                >
                    <li>Share to..</li>
                    <li>Cut</li>
                    <li>Copy</li>
                    <li>Paste</li>
                    <hr className="divider" />
                    <li>Refresh</li>
                    <li>Exit</li>
                </ul>
            ) : (
                <> </>
            )}
        </>
    );
}