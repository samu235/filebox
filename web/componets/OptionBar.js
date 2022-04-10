
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setViewTrash } from '../reducers/userReducer'
import styles from '../styles/General.module.css'
import ModalNewFolder from './ModalNewFolder'
import ModalUploadFile from './ModalUploadFileMultiple'
import ModalUser from './ModalUser'

export default function OptionBar(props) {
    const dispatch = useDispatch()
    const stateUser = useSelector(state => state.user)
    const uploadFile = () => {

    }

    const ButtonViewInit = (() => {
        return (<>
            <ModalNewFolder
                botonicon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16">
                        <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                        <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                }
                botondescription="Nueva"
                botonStyle={styles.botom + " " + styles.right}
                titelStyle={styles.blacktext}
                bodyStyle={styles.blacktext}
                nowRoute={props.nowRoute}
            />

            <ModalUploadFile botonicon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                </svg>
            }
                botondescription="Subir"
                botonStyle={styles.botom + " " + styles.right}
                titelStyle={styles.blacktext}
                bodyStyle={styles.blacktext}
                funtionReload={props.funtionReload}
                nowRoute={props.nowRoute}
            />
            {(stateUser.deleteFile) ?
                <button type="button" className={"btn btn-primary mybotom " + styles.botom + " " + styles.right} onClick={() => dispatch(setViewTrash(true))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                    basura
                </button>
                : ""}
        </>)
    })

    const ButtonViewTrash = (() => {
        return (<>

            {(stateUser.deleteFile) ?
                <button type="button" className={"btn btn-primary mybotom " + styles.botom + " " + styles.right} onClick={() => dispatch(setViewTrash(false))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                        <path  d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                        <path  d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                    Inicio
                </button>
                : ""}
        </>)
    })

    return (

        <div className={styles.header}>
            filebox
            <ModalUser
                botonicon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                }
                botondescription="User"
                botonStyle={styles.botom + " " + styles.right}
                titelStyle={styles.blacktext}
                bodyStyle={styles.blacktext}

            />
            {(!stateUser.viewTrash) ? <ButtonViewInit /> : <ButtonViewTrash/>}




        </div >

    )
}