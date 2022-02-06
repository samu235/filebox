
const express = require('express');
//const sql = require('./sql');
var cors = require('cors')
const app = express();
const multer = require('multer');
const { request, response } = require('express');
const bodyParser = require('body-parser');

var fs = require('fs');

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








app.listen(PORT);
console.log(`el servidor esta run en el puerto ${PORT}`);




