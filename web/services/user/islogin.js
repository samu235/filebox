export default async function islogin(user,idSesion) {

    const url_islogin = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/user/islogin/"

    if(idSesion == null ||idSesion === undefined||user == null ||user === undefined)
    {
        //console.log("error isLogin?1")
        return -1
    }
    //console.log("islogin1S")
    let response = await fetch(url_islogin, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'user': user,
            'idSesion': idSesion
        })
    })
    //console.log("islogin2s")
    let data = await response.json()
    //console.log(data)
    if( data[0]?.idSesion == idSesion && data[0]?.user == user){
        return 1
    }
    else{
        return -1
    }


    //console.log(data)
    return data
}