
export default async function newpassservice(user, passOld, pass) {
    /*
        const datasend = new FormData();
        datasend.append('user', user);
        datasend.append('pass', pass);
        datasend.append('email', email);
        */
    const url_newuser = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/user/newpass/"

    let response = await fetch(url_newuser, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'user': user,
            'pass': pass,
            'oldpass': passOld
        })
    })

    let data = await response.json()

    if (data.length > 0) {

        console.log(data)
    }

    return data
}