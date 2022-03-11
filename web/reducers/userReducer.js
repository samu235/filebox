
export const userReducer =(state = user, action )=>{
    if(action.type ==='@user/setUser'){
        state = {...state,
            user:action.payload.user,
            idSesion:action.payload.idSesion,
        }
    }
    return state
}

const user ={
    user:"",
    idSesion:"",
    
}

export const loginUser = (user,idSesion)=>{
    return{
        type:"@user/setUser",
        payload: {
            user:user,
            idSesion:idSesion,
        },
    }
}