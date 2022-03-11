export default async function dowloadFileService(user, idSesion, path) {
    const url_dowloadFileService = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/download/"

    let response = {}

    try {
        const partName = path.split("/")
        console.log(url_dowloadFileService)
        response = await fetch(url_dowloadFileService, {
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
        }).then(response => response.blob())
        .then(blob => {
          var url = window.URL.createObjectURL(blob);
          console.log(url)
          var a = document.createElement('a');
          a.href = url;
          a.download = partName[partName.length-1];
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();    
          a.remove();  //afterwards we remove the element again         
      });
        
    } catch (error) {
        console.log("dowloadFileService -- " + error)
    }
    //let data = await response
    return "="//data
}