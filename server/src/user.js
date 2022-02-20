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

async function  loginUser(user,pass){

    const querry="SELECT * FROM filebox.user where id = ?;"
    //const hastPass = await newEncript(pass)
    //const resultHast = await compare(pass,hastPass)

    try {
        result = await sql.query(querry, [user])
        console.log(result)

        if (result < 1){
            return {error:"no found user"}
        }
        if(await compare(pass,result[0].pass)){
            console.log("existe user")
            return {...result[0],
                    pass:""}
        }else{
            console.log("error pass")
            return {error:"error pass"}
        }
        
        
        
    } catch (error) {
        console.log("ERROR -- function newUser -- "+error)
        return -1
    }
    return -1
}

module.exports = {newUser,loginUser}