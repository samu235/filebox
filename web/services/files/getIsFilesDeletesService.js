export default async function getIsFilesDeletesService(user,idSesion) {
    const url_getIsFilesDeletesService = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/isFileDeletes/"

    let response = {}

    try {
        console.log(url_getIsFilesDeletesService)
        response = await fetch(url_getIsFilesDeletesService, {
            method: 'POST',
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
        console.log("getIsFilesDeletesService -- " + error)
    }
    let data = await response.json()
    return data
}