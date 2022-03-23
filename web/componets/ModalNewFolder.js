
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSessionUser } from '../reducers/userReducer';
import uploadMultipleService from '../services/files/uploadMultipleService'
import { useRouter } from 'next/router';
import newfolderService from '../services/files/newFolderService';


export default function ModalNewFolder(props) {

    const stateUser = useSelector(state => state.user)
    const dispatch = useDispatch()
    const router = useRouter();
    const [name,setName] = useState("")
    const [error,setError] = useState("")

    function closeSession() {
        $("#closeButtonNewFolder").click();
        console.log("closeSession")
        dispatch(closeSessionUser())
        localStorage.removeItem("idsesion")
        localStorage.removeItem("user")
        router.push("/user/login")

    }

    function newFolder() {
        newfolderService(stateUser.user,stateUser.idSesion,props.nowRoute+"/"+name).then(data => {
            console.log(data)
            if(data?.error){
                setError(data.error)
            }else if(data?.result === "ok"){
                console.log("se a creado")
                setError("")
                setName("")
                $("#closeButtonNewFolder").click();
            }
        })
    }
    function onChangeName(){
        setName($("#nameNewFolder").val())
    }


    return (
        <>

            <button type="button" className={"btn btn-primary mybotom " + props?.botonStyle} data-toggle="modal" data-target="#NewFolder">
                {props?.botonicon}
                {props?.botondescription}
            </button>

            <div className="modal fade" id="NewFolder" role="dialog" aria-labelledby="userNewFolderLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title " + props?.titelStyle} id="NewFolderLabel">{stateUser.user}</h5>
                            <button type="button" className="close" id="closeButtonNewFolder" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={"modal-body " + props?.bodyStyle}>

                            <label htmlFor="nameNewFolder">introduce nombre</label>
                            <input type="text" className="form-control" id="nameNewFolder" aria-describedby="title" placeholder="introduce nombre" onChange={onChangeName} />
                            <button onClick={newFolder}> crear</button>
                            <div>{error}</div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

