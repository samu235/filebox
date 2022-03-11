export default async function getTreeService(user, idSesion, path) {
    const url_getTreeService = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/tree"

    let response = {}

    try {
        console.log(url_getTreeService)
        response = await fetch(url_getTreeService, {
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
        console.log("getTreeService -- " + error)
    }
    let data = await response.json()
    return data
}