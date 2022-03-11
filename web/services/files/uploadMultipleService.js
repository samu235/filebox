export default async function UploadMultipleService(data,idSesion) {
    const url_UploadMultipleServices = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/api/file/uploadmultiple"
   
    let response ={}

    try {
        console.log(url_UploadMultipleServices)
        console.log(data)
         response = await fetch(url_UploadMultipleServices,  {
            method: 'POST',
            body:data,
            headers: {
                'idSesion': idSesion,
              },
            
          
        })
    } catch (error) {
        console.log("error subiendo factura -- "+ error)
    }
    return response
}