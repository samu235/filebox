
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSessionUser } from '../reducers/userReducer';
import uploadMultipleService from '../services/files/uploadMultipleService'
import { useRouter } from 'next/router';
import newfolderService from '../services/files/newFolderService';
import deleteItemesService from '../services/files/deleteItemsService';
import deleteItemesTrashService from '../services/files/deleteItemstrashService';


export default function ModalDeleteItems(props) {

    const stateUser = useSelector(state => state.user)
    const dispatch = useDispatch()
    const router = useRouter();
    const [name, setName] = useState("")
    const [error, setError] = useState("")



    function deleteItem() {
        if (stateUser.viewTrash) {
            deleteItemesTrashService(stateUser.user, stateUser.idSesion, props?.filesSelect).then(data => {
                console.log(data)
                if (data?.error) {
                    setError("error")
                } else if (data?.result === "ok") {
                    setError("")
                    setName("")
                    props?.setNeedRealoadTree(true)
                    closeModal()
                }
            })
        } else {
            deleteItemesService(stateUser.user, stateUser.idSesion, props?.filesSelect).then(data => {
                console.log(data)
                if (data?.error) {
                    setError("error")
                } else if (data?.result === "ok") {
                    setError("")
                    setName("")
                    props?.setNeedRealoadTree(true)
                    closeModal()
                }
            })
        }



    }

    function closeModal() {
        $("#DeleteItem").modal('hide')
    }


    return (
        <>


            <div className="modal fade" id="DeleteItem" role="dialog" aria-labelledby="userDeleteItemLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className={"modal-title " + props?.titelStyle} id="DeleteItemLabel">¿Seguro que quiere eliminar los archivos{(stateUser.viewTrash)?" para siempre":""}?</h5>
                            <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={"modal-body " + props?.bodyStyle}>

                            {props?.filesSelect?.map(item => {
                                let name = item.split("/")
                                console.log(name)
                                return (<div key={item}>{name[name.length - 1]}</div>)
                            })}
                            <div>{error}</div>

                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-danger' onClick={deleteItem}> eliminar</button>
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

