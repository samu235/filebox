
export default async function newsession(user, pass) {

    const datasend = new FormData();
    datasend.append('user', user);
    datasend.append('pass', pass);
    
    const url_newuser = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/user/loginuser/"

    let response = await fetch(url_newuser, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          }, 
        body:JSON.stringify({
            'user':user,
            'pass':pass
            })
    })

    let data = await response.json()

  
    //console.log(data)
    return data
}