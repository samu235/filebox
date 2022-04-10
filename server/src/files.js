const fs = require('fs');
var walk = require('walk');

var trashFolder = "tashFolder"



function readTree(dir) {
    let result = fs.readdirSync(dir, (err, files) => {
        files.forEach(file => {
        });
    });
    return result
}

function readTreeTrash(user,memoryPath) {
    
    return readTree(memoryPath+"/"+user+"_"+trashFolder)
}

function newFolder(path) {
    console.log("newFolder")
    console.log(path)
    let result = -1;
    if (!fs.existsSync(path)) {
        result = fs.mkdirSync(path, { recursive: true });
        console.log("newFolder result")
        console.log(result)
    } else {
        return 0
    }
    return result
}
function deleteItems(user, items) {
    console.log("deleteItems")
    let result = -1;
    try {
        if (!fs.existsSync(user + "_" + trashFolder)) {
            fs.mkdirSync(user + "_" + trashFolder)
        }
        for (let i = 0; i < items.length; i++) {
            let todir = user + "_" + trashFolder + items[i]
            let ofdir = user + items[i]
            let last = items[i].lastIndexOf("/")
            let lastFolder = items[i].substring(0,last)
            console.log(lastFolder)
            fs.mkdirSync(user + "_" + trashFolder+lastFolder, { recursive: true });
            fs.renameSync(ofdir, todir)
        }
    } catch (error) {
        console.log(error)
        return { error: error }
    }

    return { result: "ok" }
}
function getIsFilesDeletes(user){
    let deteleDir = user + "_" + trashFolder
    files = readTree(deteleDir)

    return (files?.length>0) ? true : false
    
}
module.exports = {readTree, newFolder, deleteItems,getIsFilesDeletes,readTreeTrash}