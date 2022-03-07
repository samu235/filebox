import { useEffect, useState } from "react"
import newsession from "../../../services/user/newsession"
import { useRouter } from 'next/router';
import Link from 'next/link'

import styles from "/styles/Registro.module.css"





export default function Login() {

    const router = useRouter();
    var { state, setstate } = useState("")
    const [error, setError] = useState("")

    const mysend = function (event) {
        event.preventDefault()
        console.log("enviar formulaio  " + event.currentTarget.username.value)
        const user = event.currentTarget.username.value
        const pass = event.currentTarget.password.value


        newsession(user, pass).then((data) => {

            console.log("datos")
            console.log(data)

            function deletePermision() {
                localStorage.removeItem("idsesion")
                localStorage.removeItem("user")
                //console.log("deletePermision")
            }
            if (data && !data.error) {
                let myuser = data
                //console.log(myuser)
                if (myuser.id === undefined || myuser.id == null || myuser.id.length <= 0
                    || myuser.typeUser === undefined || myuser.typeUser == null
                    || myuser.idSesion === undefined || myuser.idSesion == null) {
                    //console.log("ERROR user=" + data[0].user + " iduser=" + data.iduser)
                    deletePermision()
                }
                else {
                    if (myuser.typeUser == 1) {
                        localStorage.setItem("idsesion", myuser.idSesion)
                        localStorage.setItem("user", myuser.id)
                        setError("")
                    }
                    else {
                        deletePermision()
                        setError("usuario sin permisos")
                    }
                }
            } else if (data.error) {
                setError(data.error)
                deletePermision()
            } else {
                console.log("no find user=" + user)
                deletePermision()
            }
        })
    }



    return (
        <div className={styles.cartResgistrofondo}>
            <form onSubmit={mysend} method="POST">
                <div className={"card " + styles.cardRegistro}>
                    <h1 className={styles.carttitel}>Login</h1>

                    <div>
                        <label htmlFor="username">User</label>
                        <input type='text'
                            placeholder='username'
                            id='username'
                            className="form-control"
                        />
                    </div>
                    <div>{state}</div>
                    <br />
                    <div>
                        <label htmlFor="password">password</label>
                        <input
                            type='password'
                            placeholder='password'
                            id='password'
                            className="form-control"
                        />
                    </div>
                    <Link  href="/user/registro">
                        <a className={styles.enlace}>O registrate</a>
                    </Link>
                    <br />
                    <div className={styles.error}>{error}</div>
                    <button className={"btn btn-primary " + styles.cartButon}>Login</button>

                </div>
            </form>
        </div>
    )

}