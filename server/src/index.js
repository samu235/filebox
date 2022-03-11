
const express = require('express');
var cors = require('cors')
const app = express();
const multer = require('multer');
const { request, response } = require('express');
const bodyParser = require('body-parser');
const { newUser, loginUser } = require("./user")

var fs = require('fs');
const urlFilesTemporal = "/temporalfiles/"//process.env.NEXT_PUBLIC_FOLDER_SAVE_FACTURAS

//newUser("celia","celiapass","celia@",0)

//const { env } = require('process');
const dotenv = require('dotenv')
const sharp = require('sharp');
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/*
const resultdotenv = dotenv.config()

if (resultdotenv.error) {
    throw resultdotenv.error
}
*/
const storage = multer.diskStorage({
    destination: urlFilesTemporal,
    filename: function (req, file, cb) {
        cb("", file.originalname)
    }
})

const upload = multer({
    storage: storage
})

app.post("/uploadfile", upload.single('filedata'), (request, response) => {
    const file = request.body.name
    try {
                response.json({ "state": "OK" }).send()
    } catch (error) {
        response.json().sendStatus(500)
    }

    return;
})

app.post('/uploadmultiple', upload.array('filedata'), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
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







app.listen(PORT);
console.log(`el servidor esta run en el puerto ${PORT}`);




