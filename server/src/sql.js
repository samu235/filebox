var mysql = require('mysql');

const pool = mysql.createPool({
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : 'secret',
    database : 'filebox'
});



   
   // Recibe una declaración sql y los valores requeridos
   // La razón para recibir los valores del segundo parámetro aquí es que puede usar el marcador de posición de mysql '?'
   // como query (`select * from my_database where id =?`, [1])
   
   function query( sql, values ) {
       // devolver una promesa
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
   
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
                       // finaliza la sesión
            connection.release()
          })
        }
      })
    })
  }
   
  //module.exports =  query;
  exports.query = query;