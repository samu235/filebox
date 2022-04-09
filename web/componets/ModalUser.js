
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSessionUser } from '../reducers/userReducer';
import uploadMultipleService from '../services/files/uploadMultipleService'
import { useRouter } from 'next/router';


export default function ModalUser(props) {

    const stateUser = useSelector(state => state.user)
    const dispatch = useDispatch()
    const router = useRouter();
    
    function closeSession (){
        $("#closeButton").click();
        console.log("closeSession")
        dispatch(closeSessionUser())
        localStorage.removeItem("idsesion")
        localStorage.removeItem("user")
        router.push("/user/login")

    }

    function changePass (){
        
    }


    return (
        <>

            <button type="button" className={"btn btn-primary mybotom " + props?.botonStyle} data-toggle="modal" data-target="#userModal">
                {props?.botonicon}
                {props?.botondescription}
            </button>

            <div className="modal fade" id="userModal" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title " + props?.titelStyle} id="userModalLabel">{stateUser.user}</h5>
                            <button type="button" className="close"id="closeButton" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={"modal-body " + props?.bodyStyle}>
                            <div>

                                <div>{stateUser.user}</div>
                                <div>{stateUser.idSesion}</div>

                            </div>
                            <button onClick={closeSession}> cambiar contraseña</button>
                            <button onClick={closeSession}> cerrar sesion</button>


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

