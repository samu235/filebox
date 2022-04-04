import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import islogin from '../services/user/islogin';
import Login from '../pages/user/login'
import Registro from '../pages/user/registro'

export default function IsLogin(props) {

    const router = useRouter();
    const [login, setlogin] = useState(0)
    const stateUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    function isLoginNow() {
        let user = null
        let idsesion = null
        let notSaveUser = false;



        if (stateUser.user && stateUser.user.length > 0 && stateUser.idSesion && stateUser.idSesion.length > 0) {
            user = stateUser.user
            idsesion = stateUser.idSesion
        } else {
            user = localStorage.getItem("user")
            idsesion = localStorage.getItem("idsesion")
            notSaveUser = true
        }

        if (user && idsesion) {
            if (notSaveUser) {
                dispatch(loginUser(user, idsesion))
            }
            //console.log("islogin ----- GO")
            islogin(user,idsesion).then(data => {
                //console.log("islogin?")
                //console.log(data)
                setlogin(data)
            })

        }else{
            setlogin(-1)
        }



    }



    useEffect(() => {
        isLoginNow()
        const intervalIsLogin = setInterval(() => {
            //console.log('intervalIsLogin');
            isLoginNow()
        }, 5 *60* 1000);

        return () => clearInterval(intervalIsLogin);
    }, [])

    useEffect(() => {
        isLoginNow()
      }, [props.component])
      
    useEffect(() => {
        console.log("detectamos cambio de componente============")
        if (login < 0 && (props.component != Login && props.component != Registro)) {
            console.log("sin Loguear ========")
            router.push("/user/login")
        }
    }, [ login])

    return (<>
    {(login==0) ? <div>cargando</div>:""}</>)
}