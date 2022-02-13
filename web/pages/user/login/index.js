import { useEffect, useState } from "react"
import newsession from "../../../services/user/newsession"
import { useRouter } from 'next/router';






export default function Login() {

    const router = useRouter();
    var {state,setstate} = useState("")

    const mysend = function (event) {
        event.preventDefault()
        console.log("enviar formulaio  " + event.currentTarget.username.value)
        const user = event.currentTarget.username.value
        const pass = event.currentTarget.password.value

        const result = newsession(user, pass).then((data) => {

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



    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={mysend} method="POST">
                <div>
                    <input type='text'
                        placeholder='username'
                        id='username'
                    />
                </div>
                <div>{state}</div>
                <br/>
                <div>
                    <input
                        type='password'
                        placeholder='password'
                        id='password'
                    />
                </div>
                <br/>
                <button>Login</button>
            </form>
        </div>
    )

}