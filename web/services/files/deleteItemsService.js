export default async function deleteItemesService(user, idSesion, delteFiles) {
    const url_deleteItemesService = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/deleteitems"

    let response = {}

    try {
        console.log(url_deleteItemesService)
        response = await fetch(url_deleteItemesService, {
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
        console.log("deleteItemesService -- " + error)
    }
    let data = await response.json()
    return data
}