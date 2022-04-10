
export const userReducer =(state = user, action )=>{
    if(action.type ==='@user/setUser'){
        state = {...state,
            user:action.payload.user,
            idSesion:action.payload.idSesion,
        }
    }else if(action.type ==='@user/setDeleteFiles'){
        state = {...state,
            deleteFile:action.payload.deleteFile,
        }
    }
    else if(action.type ==='@user/setViewTrash'){
        state = {...state,
            viewTrash:action.payload.viewTrash,
        }
    }
    return state
}

const user ={
    user:"",
    idSesion:"",
    deleteFile:false,
    viewTrash:false,
    
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

export const closeSessionUser = ()=>{
    return{
        type:"@user/setUser",
        payload: {
            user:"",
            idSesion:"",
        },
    }
}

export const setIsDeleteFiles = (deleteFile)=>{
    return{
        type:"@user/setDeleteFiles",
        payload: {
            deleteFile:deleteFile,
        },
    }
}
export const setViewTrash = (view)=>{
    console
    return{
        type:"@user/setViewTrash",
        payload: {
            viewTrash:view,
        },
    }
}

