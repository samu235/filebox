const sql = require('./sql')
const {compare,newEncript} = require("./encrypt")



async function  newUser(user,pass,mail,typeUser){

    const querry="INSERT INTO `filebox`.`user` (`id`, `pass`, `typeUser`, `mail`) VALUES (?, ?, ?, ?);"
    const hastPass = await newEncript(pass)
    //const resultHast = await compare(pass,hastPass)

    try {
        result = await sql.query(querry, [user,hastPass,typeUser,mail])
        console.log(result)
        if(result?.affectedRows == 1)
        {
           return result; 
        }
        
    } catch (error) {
        console.log("ERROR -- function newUser -- "+error)
        return -1
    }
    return -1
}

module.exports = {newUser}