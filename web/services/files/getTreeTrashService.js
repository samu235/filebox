export default async function getTreeTrashService(user, idSesion) {
    const url_getTreeTrashService = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/treetrash"

    let response = {}

    try {
        //console.log(url_getTreeTrashService)
        response = await fetch(url_getTreeTrashService, {
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
        console.log("getTreeTrashService -- " + error)
    }
    let data = await response.json()
    return data
}