
const express = require('express');
var cors = require('cors')
const app = express();
const multer = require('multer');
const { request, response } = require('express');
const bodyParser = require('body-parser');
const {newUser} = require("./user")

var fs = require('fs');

newUser("celia","celiapass","celia@",0)

//const { env } = require('process');
const dotenv = require('dotenv')
const sharp = require('sharp');
const PORT = 3001;
/*
const resultdotenv = dotenv.config()

if (resultdotenv.error) {
    throw resultdotenv.error
}
*/



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/api/user/newuser/', async (request, response) => {
    const user = request.body.user;
    const email = request.body.email;
    const pass = request.body.pass;
    const result = await newUser(user,pass,email,0);

    if(result != -1){
        response.status(200).json(result)
    }
    else{
        response.status(400)
    }
    
})









app.listen(PORT);
console.log(`el servidor esta run en el puerto ${PORT}`);




