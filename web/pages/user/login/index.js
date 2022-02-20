import { useEffect, useState } from "react"
import newsession from "../../../services/user/newsession"
import { useRouter } from 'next/router';

import styles from "/styles/Registro.module.css"





export default function Login() {

    const router = useRouter();
    var { state, setstate } = useState("")
    const [error,setError]=useState("")

    const mysend = function (event) {
        event.preventDefault()
        console.log("enviar formulaio  " + event.currentTarget.username.value)
        const user = event.currentTarget.username.value
        const pass = event.currentTarget.password.value
        

        newsession(user, pass).then((data) => {

            console.log("datos")
            console.log(data)
            if (data && !data.error) {
                let myuser = data
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
            } else if(data.error){
                setError(data.error)
            }else {
                console.log("no find user=" + user)
                //setstate("no find user=" + user)
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
                    <br />
                    <div className={styles.error}>{error}</div>
                    <button className={"btn btn-primary " + styles.cartButon}>Login</button>

                </div>
            </form>
        </div>
    )

}