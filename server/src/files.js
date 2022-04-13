const fs = require('fs');
var walk = require('walk');

var trashFolder = "tashFolder"



function readTree(dir) {
    let result = []
    try {
        result = fs.readdirSync(dir);
    } catch (error) {

    }

    return result
}

function readTreeTrash(user, path, path_read = "") {
    let result = []
    let dir = path + "/" + user + "_" + trashFolder + "/" + path_read
    try {
        files = fs.readdirSync(dir)
        files.forEach(file => {

            let stats = fs.statSync(dir + "/" + file)
            if (stats.isDirectory()) {
                result.push(...readTreeTrash(user, path, path_read + file + "/"))
            } else {
                result.push(path_read + "/" + file)
            }
        })
    } catch (error) {
        console.log("error moveRecursive".error)
        return result
    }

    //return readTree(memoryPath+"/"+user+"_"+trashFolder)
    return result
}

function newFolder(path) {
    let result = -1;
    if (!fs.existsSync(path)) {
        result = fs.mkdirSync(path, { recursive: true });
    } else {
        return 0
    }
    return result
}
function deleteItems(user, items) {
    let result = -1;
    try {
        if (!fs.existsSync(user + "_" + trashFolder)) {
            fs.mkdirSync(user + "_" + trashFolder)
        }
        for (let i = 0; i < items.length; i++) {
            let todir = user + "_" + trashFolder + items[i]
            let ofdir = user + items[i]
            let last = items[i].lastIndexOf("/")
            let lastFolder = items[i].substring(0, last)
            fs.mkdirSync(user + "_" + trashFolder + lastFolder, { recursive: true });
            fs.renameSync(ofdir, todir)
        }
    } catch (error) {
        console.log(error)
        return { error: error }
    }

    return { result: "ok" }
}
function deleteItemsTrash(user, items) {
    let mydir = user + "_" + trashFolder
    if (items?.length > 0) {
        try {
            items.map(item => {
                fs.unlinkSync(mydir + "/" + item)
            })
            removeEmpyFolder(mydir)
        } catch (error) {
            console.log(error)
            // return { error: error }
        }
    }

    return { result: "ok" }
}
function deleteItemsTrashAll(user) {
    //let items = readTree(user + "_" + trashFolder)
    //deleteItemsTrash(user, items)

    fs.rmSync(user + "_" + trashFolder, { recursive: true, force: true });
    return { result: "ok" }
}
function getIsFilesDeletes(user) {
    let deteleDir = user + "_" + trashFolder
    files = readTree(deteleDir)

    return (files?.length > 0) ? true : false

}
async function removeEmpyFolder(folder) {
    try {
        fs.readdir(folder, (err, files) => {
            if (files?.length > 0) {
                files.map(file => {
                    let stats = fs.statSync(folder + "/" + file)
                    if (stats.isDirectory()) {
                        removeEmpyFolder(folder + "/" + file)
                    }
                })
            } else {
                fs.rmSync(folder, { recursive: true });

            }
        })

    } catch (error) {
        console.error("error  removeEmpyFolder " + folder, error)
    }

}

function restore(user, files) {
    let myDir = user + "_" + trashFolder
    let newDir = user
    try {
        files.map(file => {
            let myfile = myDir + "/" + file
            let NewFile = newDir + "/" + file
            let last = NewFile.lastIndexOf("/")
            let lastFolder = NewFile.substring(0, last)
            if (!fs.existsSync(lastFolder)) {
                fs.mkdirSync(lastFolder)
            }
            
            fs.renameSync(myfile, NewFile)
        })
    } catch (error) {
        console.log("error -- restore --",error)
        return { error: error }
    }
    return { result: "ok" }
}

function moveRecursive(oldPath, newPath) {

    try {
        fs.readdirSync(dir, (err, files) => {
            files.forEach(file => {
                if (file.isDirectory()) {
                    if (!fs.existsSync(newPath + file)) {
                        fs.mkdirSync(user + "_" + trashFolder)
                    }
                    moveRecursive(oldPath + file, newPath + file)
                } else {
                    fs.renameSync(oldPath + file, newPath + file)
                }
            });
        });
    } catch (error) {
        console.log("error moveRecursive".error)
        return false
    }
    return true
}


module.exports = { readTree, newFolder, deleteItems, getIsFilesDeletes, readTreeTrash, deleteItemsTrash, deleteItemsTrashAll,restore }