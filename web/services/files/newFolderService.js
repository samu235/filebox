export default async function newfolderService(user, idSesion, path) {
    const url_newfolderService = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/newfolder"

    let response = {}

    try {
        console.log(url_newfolderService)
        response = await fetch(url_newfolderService, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'idSesion': idSesion,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'user':user,
                'idSesion':idSesion,
                'path':path,
            }),
        })
        
    } catch (error) {
        console.log("newfolderService -- " + error)
    }
    let data = await response.json()
    return data
}