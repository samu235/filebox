
const express = require('express');
var cors = require('cors')
const app = express();
const multer = require('multer');
const { request, response } = require('express');
const bodyParser = require('body-parser');
const { newUser, loginUser, isLogin, isIdSesion } = require("./user")
var router = express.Router();

var fs = require('fs');
const urlFilesTemporal = "./temporalfiles/"//process.env.NEXT_PUBLIC_FOLDER_SAVE_FACTURAS
const urlMemory = "./../memory/"

//newUser("celia","celiapass","celia@",0)

//const { env } = require('process');
const dotenv = require('dotenv')
const sharp = require('sharp');
const { readTree } = require('./files');
const PORT = 3001;

app.use('/', router);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const storage = multer.diskStorage({
    destination: urlFilesTemporal,
    filename: function (req, file, cb) {
        cb("", Date.now()+"TEMP"+file.originalname)
    }
})

const upload = multer({
    storage: storage
})

app.use("/api/file/",async function (req, res, next) {
    console.log('Time:', Date.now());
   
    const idSesion = req.headers['idsesion']
    const result = await isIdSesion( idSesion);

    if (result != -1) {
        console.log("loger OK "+idSesion)
        return next()
    }
    else {
        res.status(500).json({ error: "no login" })
        console.log("Error no login -- "+idSesion)
    }

  })

app.post("/api/file/uploadfile", upload.single('filedata'), (request, response) => {
    const file = request.body.name
    try {
                response.json({ "state": "OK" }).send()
    } catch (error) {
        response.json().sendStatus(500)
    }

    return;
})

app.post('/api/file/uploadmultiple', upload.array('filedata'), (req, res, next) => {
    const files = req.files
    const user = req.body.user
    const idSesion = req.body.idSesion
    const path = req.body.path
    console.log("/api/file/uploadmultiple")
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    if( user === undefined || user == null || user <= 0){
        res.status(200).json({ error: "error user" })
        return next()
    }
    if( idSesion === undefined || idSesion == null || idSesion <= 0){
        res.status(200).json({ error: "error idSesion" })
        return next()
    }
    try{
        let folder = urlMemory +  user +"/"+ path + "/"
        if (!fs.existsSync(folder)) {
            console.log("creando directorio: " + folder)
            fs.mkdirSync(folder, { recursive: true });
            need_resize=true
        }
        files.map(data=>{
            console.log(data.path)
            console.log(folder+data.originalname)
            fs.rename(data.path,folder+data.originalname, function (err) {
                if (err) throw err
                console.log('Successfully renamed - AKA moved!')
              })})
    }catch(e){
        console.log(e)
    }

    console.log(files)
    res.send(files)

    return;
})


app.post('/api/user/newuser/', async (request, response) => {
    const user = request.body.user;
    const email = request.body.email;
    const pass = request.body.pass;
    const result = await newUser(user, pass, email, 0);

    if (result != -1) {
        response.status(200).json(result)
    }
    else {
        response.sendStatus(400)
    }

})

app.post('/api/user/loginuser/', async (request, response) => {
    const user = request.body.user;
    const pass = request.body.pass;
    try {
        let result = await loginUser(user, pass)
        console.log(result)
        if (!result.error) {
            response.status(200).json(result)
        } else {
            response.status(400).json(result)
        }
    } catch (error) {
        response.sendStatus(400)
    }



})
app.post('/api/user/islogin/', async (request, response) => {
    const user = request.body.user;
    const idSesion = request.body.idSesion;

    const result = await isLogin(user, idSesion);

    if (result != -1) {
        response.status(200).json(result)
    }
    else {
        response.status(200).json({ error: "no login" })
    }

})
app.post("/api/file/tree/",(request, response) => {
    const user = request.body.user;
    const idSesion = request.body.idSesion;
    const path = request.body.path;

   
    console.log("/api/file/tree/")
    //console.log(request)
    console.log(user+" -- "+idSesion+" -- "+path)

    let result = readTree(urlMemory+"/"+user+path)
    console.log(result)
    response.status(200).json({ tree: result })

})

app.post("/api/file/download/",(request, response) => {
    const user = request.body.user;
    const idSesion = request.body.idSesion;
    const path = request.body.path;
    console.log("/api/file/download/")
    console.log(user+" -- "+idSesion+" -- "+path)
    response.download(urlMemory+"/"+user+path)
})


app.listen(PORT);
console.log(`el servidor esta run en el puerto ${PORT}`);

readTree(urlMemory+"/samu/")


