import { useRef } from "react"
import UploadMultipleService from "../services/files/uploadMultipleService"

export default function UploadMultiple() {

    const form = useRef(null)

    const mysend = (event) => {
        console.log("okk")
        event.preventDefault()
        const fromdata = new FormData(form.current)
        fromdata.append("date", "sgm");
        console.log(fromdata)

        UploadMultipleService(fromdata).then(data => {
            console.log("enviado -- ")
            console.log(data)
        }).catch((e) => {
            console.log("error enviando -- " + e)
        })
    }

    return (
        <>
            <form ref={form} onSubmit={mysend} encType="multipart/form-data">
                <input type="file" name="filedata" id="filedata"  multiple></input>
                <input type="submit" id="btnSendFile" value="enviar"></input>
            </form>
        </>
    )
}