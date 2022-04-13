export default async function restoreItemsService(user, idSesion, restoreFiles) {
    const url_restoreItemsService = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/restore"

    let response = {}

    try {
        console.log(url_restoreItemsService)
        response = await fetch(url_restoreItemsService, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'idSesion': idSesion,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'user':user,
                'idSesion':idSesion,
                'restoreFiles':restoreFiles,
            }),
        })
        
    } catch (error) {
        console.log("restoreItemsService -- " + error)
    }
    let data = await response.json()
    return data
}