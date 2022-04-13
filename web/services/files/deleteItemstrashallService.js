export default async function deleteItemesTrashAllService(user, idSesion) {
    const url_deleteItemesTrashAllService = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/deleteitemstrashall"

    let response = {}

    try {
        console.log(url_deleteItemesTrashAllService)
        response = await fetch(url_deleteItemesTrashAllService, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'idSesion': idSesion,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'user':user,
            }),
        })
        
    } catch (error) {
        console.log("deleteItemesTrashServiceAll -- " + error)
    }
    let data = await response.json()
    return data
}