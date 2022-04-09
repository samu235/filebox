import { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import newuser from "../../../services/user/newuser";

import styles from "/styles/Registro.module.css"
import { useSelector } from "react-redux";





export default function NewPass() {

    const router = useRouter();
    const stateUser = useSelector(state => state.user)

    const mysend = function (event) {
        event.preventDefault()
        
        const oldPass = event.currentTarget.oldpassword.value
        const pass = event.currentTarget.password.value
        

        const result = NewPass(stateUser.user, pass,oldPass).then((data) => {

            console.log("datos")
            console.log(data)
            if (data.length > 0) {
                let myuser = data[0]
                console.log(myuser)
                if (myuser.iduser === undefined || myuser.iduser == null || myuser.iduser.length <= 0 || myuser.user === undefined || myuser.user == null || myuser.user.length <= 0) {
                    //console.log("ERROR user=" + data[0].user + " iduser=" + data.iduser)
                }
                else {
                    localStorage.setItem("idsesion", myuser.iduser)
                    localStorage.setItem("user", myuser.user)
                    router.push("/")
                    //console.log("route user=" + myuser.user + " iduser=" + myuser.iduser)
                }
            } else {
                console.log("no find user=" + user)
                //setstate("no find user=" + user)
            }
        })
    }

    function myChange() {
        let enableButton = true
        let pass1 = $("#password").val()
        let pass2 = $("#password2").val()
        let oldPass = $("#oldpassword").val()
        
        if (pass1 != pass2 || pass1.length <= 0) {
            enableButton = false;
        }
        if (oldPass.length <= 0 ) {
            enableButton = false;
        }
        $("#buttonSend").prop("disabled", !enableButton);
    }

    useEffect(() => {
        myChange()
    }, [])

    return (
        <div className={styles.cartResgistrofondo}>

            <form onSubmit={mysend} method="POST">
                <div className={"card " + styles.cardRegistro}>
                    <h1 className={styles.carttitel}>New Pass</h1>
                    
                    <br />
                    <div>
                        <label htmlFor="password"> old password</label>
                        <input
                            type='password'
                            placeholder='old password'
                            id='oldpassword'
                            className="form-control"
                            onChange={myChange}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password"> new password</label>
                        <input
                            type='password'
                            placeholder='new password'
                            id='password'
                            className="form-control"
                            onChange={myChange}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password2">repeat new password</label>
                        <input
                            type='password'
                            placeholder='repeat new password'
                            id='password2'
                            className="form-control"
                            onChange={myChange}
                        />
                    </div>
                    <br />

                    <button id="buttonSend" className={"btn btn-primary " + styles.cartButon}>Registro</button>
                </div>

            </form>
        </div>
    )

}