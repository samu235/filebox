import { useEffect, useState } from "react"
import newsession from "../../../services/user/newsession"
import { useRouter } from 'next/router';
import Link from 'next/link'

import styles from "/styles/Registro.module.css"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../reducers/userReducer";




export default function Login() {

    const router = useRouter();
    var { state, setstate } = useState("")
    const [error, setError] = useState("")
    const stateUser = useSelector(state => state.user)
    const dispatch = useDispatch()

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
                
            }
            if (data && !data.error) {
                let myuser = data
                //console.log(myuser)
                if (myuser.id === undefined || myuser.id == null || myuser.id.length <= 0
                    || myuser.typeuser === undefined || myuser.typeuser == null
                    || myuser.idSesion === undefined || myuser.idSesion == null) {
                    deletePermision()
                }
                else {
                    if (Number(myuser.typeuser) >0) {
                        localStorage.setItem("idsesion", myuser.idSesion)
                        localStorage.setItem("user", myuser.user)
                        dispatch(loginUser(myuser.id,myuser.idSesion))
                        setError("")
                        router.push("/")
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
                setError("last error")
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