export default async function UploadMultipleService(data) {
    const url_UploadMultipleServices = "http://" + process.env.NEXT_PUBLIC_API_SERVER_URL + ":" + process.env.NEXT_PUBLIC_API_SERVER_PORT + "/uploadmultiple"
   
    let response ={}

    try {
        console.log(url_UploadMultipleServices)
        console.log(data)
         response = await fetch(url_UploadMultipleServices,  {
            method: 'POST',
            body:data
            
          
        })
    } catch (error) {
        console.log("error subiendo factura -- "+ error)
    }
    return response
}