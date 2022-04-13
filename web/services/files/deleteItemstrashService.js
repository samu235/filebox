export default async function deleteItemesTrashService(user, idSesion, delteFiles) {
    const url_deleteItemesTrashService = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/deleteitemstrash"

    let response = {}

    try {
        console.log(url_deleteItemesTrashService)
        response = await fetch(url_deleteItemesTrashService, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'idSesion': idSesion,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'user':user,
                'idSesion':idSesion,
                'delteFiles':delteFiles,
            }),
        })
        
    } catch (error) {
        console.log("deleteItemesTrashService -- " + error)
    }
    let data = await response.json()
    return data
}