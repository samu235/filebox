var mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
  host: process.env.HOST_DDBB,
  port: '3306',
  user: 'root',
  password: 'secret'
});
console.log("port ddbb:")
console.log(process.env.HOST_DDBB)


// Recibe una declaración sql y los valores requeridos
// La razón para recibir los valores del segundo parámetro aquí es que puede usar el marcador de posición de mysql '?'
// como query (`select * from my_database where id =?`, [1])

function query(sql, values) {
  // devolver una promesa
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // finaliza la sesión
          connection.release()
        })
      }
    })
  })
}

async function createDB() {
  console.log("creamos ddbb")
  console.log(path.join(__dirname,'./sqlfiles/filebox_user.sql'))
  const data = fs.readFileSync(path.join(__dirname,'./sqlfiles/filebox_user.sql')).toString().replace(/(\r\n|\n|\r)/gm, "");
  const dataSplit = data.split(";")
  //console.log(data)
  console.log(dataSplit.length)
  try {
    for(i = 0; i < dataSplit.length;i++){
      console.log(dataSplit[i])
      const myquery = await query(dataSplit[i]+";")
      console.log(myquery)
    }
      
    
    //const myquery = await query(data)
   // console.log(myquery)
  } catch (error) {
    console.log("error - "+error)
  }
}

//module.exports =  query;

//createDB()
exports.query = query;