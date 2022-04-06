const sql = require('./sql')
const {compare,newEncript} = require("./encrypt")
const { v4: uuidv4 } = require('uuid');



async function  newUser(user,pass,mail,typeUser){

    const querry="INSERT INTO `filebox`.`user` (`user`, `pass`, `typeUser`, `mail`) VALUES (?, ?, ?, ?);"
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

    const querry="SELECT * FROM filebox.user where user = ?;"
    const querry_update="UPDATE `filebox`.`user` SET `idSesion` = ? WHERE (`id` = ?);"
    let uuid = uuidv4()
    //const hastPass = await newEncript(pass)
    //const resultHast = await compare(pass,hastPass)

    try {
        let result = await sql.query(querry, [user])
        console.log(result)

        if (result < 1){
            return {error:"no found user"}
        }
        
        if(await compare(pass,result[0].pass)){
            console.log("existe user")
            let result2 = await sql.query(querry_update, [uuid,result[0].id])
            console.log(result2)
            if(result2.affectedRows==1){
                return {...result[0],
                    pass:"",
                    idSesion:uuid}
            }else{
                return {error:"error server"}
            }
            
            
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

async function  isLogin(user,idSesion){

    const querry="SELECT user,idSesion FROM filebox.user where user=? and idSesion=?;"
    const querry_update = "UPDATE `filebox`.`user` SET `lastSesion` = '2022-02-06 13:52:27' WHERE (`id` = ?);"


    try {
        result = await sql.query(querry, [user,idSesion])
        console.log(result)
        if(result.length > 0 && result[0]?.user === user)
        {
           return result; 
        }else{
            return -1
        }
        
    } catch (error) {
        console.log("ERROR -- function isLogin -- "+error)
        return -1
    }
    return -1
}

async function  isIdSesion(idSesion){

    const querry="SELECT user,idSesion FROM filebox.user where idSesion=?;"
    const querry_update = "UPDATE `filebox`.`user` SET `lastSesion` = '2022-02-06 13:52:27' WHERE (`id` = ?);"


    try {
        console.log("isIdSesion")
        result = await sql.query(querry, [idSesion])

        if(result.length > 0 && result[0]?.idSesion==idSesion  )
        {
            console.log("isIdSesion -- ok")
           return result; 
           
        }else{
            console.log("isIdSesion -- fail")
        }
    } catch (error) {
        console.log("ERROR -- function isIdSesion -- "+error)
        return -1
    }
    return -1
}

module.exports = {newUser,loginUser,isLogin,isIdSesion}