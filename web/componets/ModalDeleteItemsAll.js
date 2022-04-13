
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import deleteItemesTrashAllService from '../services/files/deleteItemstrashallService';
import { setViewTrash } from '../reducers/userReducer';


export default function ModalDeleteItemsAll(props) {

    const stateUser = useSelector(state => state.user)
    const dispatch = useDispatch()
    const router = useRouter();
    const [name, setName] = useState("")
    const [error, setError] = useState("")



    function onClickliminarAll() {

        deleteItemesTrashAllService(stateUser.user, stateUser.idSesion).then(data => {
            console.log(data)
            if (data?.error) {
                setError("error")
            } else if (data?.result === "ok") {
                setError("")
                setName("")
                closeModal()
                dispatch(setViewTrash(false))
                
            }
        })




    }

    function closeModal() {
        $("#deleteAllModalCloseBt").click()
    }


    return (
        <>

            <button type="button" className={"btn btn-primary mybotom " + props?.botonStyle} data-toggle="modal" data-target="#deleteItemall">
                {props?.botonicon}
                {props?.botondescription}
            </button>

            <div className="modal fade" id="deleteItemall" role="dialog" aria-labelledby="deleteItemallLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title " + props?.titelStyle} id="deleteItemallLabel">¿Seguro que quiere vaciar la papelera?</h5>
                            <button type="button" className="close" id="closeButton" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={onClickliminarAll}>eliminar todo</button>
                            <button type="button" id="deleteAllModalCloseBt" className="btn btn-secondary" data-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

