import { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import newuser from "../../../services/user/newuser";

import styles from "/styles/Registro.module.css" 





export default function Registro() {

    const router = useRouter();

    const mysend = function (event) {
        event.preventDefault()
        console.log("enviar formulaio  " + event.currentTarget.username.value)
        const user = event.currentTarget.username.value
        const pass = event.currentTarget.password.value
        const email = event.currentTarget.email.value

        const result = newuser(user, pass, email).then((data) => {

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

    function myChange(){
        let enableButton = true
        let  pass1 = $( "#password" ).val()
        let pass2 = $( "#password2" ).val()
        let mail = $( "#email" ).val()
        const  emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        console.log(pass1)
        if(pass1 != pass2 || pass1.length <=0  ){
            enableButton=false;
        }
        if( mail.length <=0 || !(emailRegex.test(mail) )){
            enableButton=false;
        }
        
        console.log(enableButton)
        console.log(pass1.length)
        $( "#buttonSend" ).prop("disabled",!enableButton);
    }

    useEffect(()=>{
        myChange()
    },[])

    return (
        <div className={styles.cartResgistrofondo}>
            
            <form onSubmit={mysend} method="POST">
                <div className={"card "+styles.cardRegistro}>
                <h1 className={styles.carttitel}>Login</h1>
                    <div>
                    <label htmlFor="username">User</label>
                        <input type='text'
                            placeholder='username'
                            id='username'
                            className="form-control"
                        />
                    </div>
                    <br />
                    <div>
                    <label htmlFor="email">email</label>
                        <input
                            type='email'
                            placeholder='email'
                            id='email'
                            className="form-control"
                            onChange={myChange}
                        />
                    </div>
                    <br />
                    <div>
                    <label htmlFor="password">password</label>
                        <input
                            type='password'
                            placeholder='password'
                            id='password'
                            className="form-control"
                            onChange={myChange}
                        />
                    </div>
                    <br />
                    <div>
                    <label htmlFor="password2"> repeat password</label>
                        <input
                            type='password'
                            placeholder='password'
                            id='password2'
                            className="form-control"
                            onChange={myChange}
                        />
                    </div>
                    <br />

                    <button id="buttonSend" className={"btn btn-primary "+styles.cartButon}>Login</button>
                </div>

            </form>
        </div>
    )

}