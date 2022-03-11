
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import uploadMultipleService from '../services/files/uploadMultipleService'
import styles from './../styles/General.module.css'


export default function ModalUploadFile(props) {

    const form = useRef(null)
    const [mysendok, setmysendok] = useState("")
    const [mysenderror, setmysenderror] = useState("")

    const stateUser = useSelector(state => state.user)

    const mysend = (event) => {
        event.preventDefault()
        $("#btnSendImg").prop("disabled", true)
        const fromdata = new FormData(form.current)
        fromdata.append("user", stateUser.user);
        fromdata.append("idSesion", stateUser.idSesion);
        uploadMultipleService(fromdata,stateUser.idSesion).then(data => {
            console.log("enviado -- ")
            setmysendok("Enviado")
            props.funtionReload()

        }).catch((e) => {
            console.log("error enviando -- " + e)
            setmysenderror("error  -- " + e)
        })
    }
    function newFileSelect() {
        $("#btnSendFile").prop("disabled", false)
        setmysendok("")
        setmysenderror("")
    }

    return (
        <>

            <button type="button" className={"btn btn-primary mybotom "+props?.botonStyle} data-toggle="modal" data-target="#exampleModal">
                {props?.botonicon}
                {props?.botondescription}
            </button>

            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title " +props?.titelStyle} id="exampleModalLabel">Subir Archivo</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={"modal-body "+props?.bodyStyle}>
                            <div>
                                <form ref={form} onSubmit={mysend} encType="multipart/form-data">
                                    <input type="file" name="filedata" id="filedata" onChange={newFileSelect} multiple></input>
                                    <input type="submit" id="btnSendFile" value="enviar"></input>
                                </form>
                                <div >{mysendok}</div>
                                <div >{mysenderror}</div>

                            </div>
                       

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {/*<button type="button" className="btn btn-primary " data-dismiss="modal">Save changes</button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

