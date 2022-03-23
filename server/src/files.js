const fs = require('fs');
var walk = require('walk');



function readTree(dir) {
    let result = fs.readdirSync(dir, (err, files) => {
        files.forEach(file => {
            //console.log(file);
            //result.push(file)
        });
    });
    return result
}
function newFolder(path) {
    console.log("newFolder")
    console.log(path)
    let result = -1;
    if (!fs.existsSync(path)) {
        result = fs.mkdirSync(path, { recursive: true });
        console.log("newFolder result")
        console.log(result)
    }else{
        return 0
    }
    return result
}
module.exports = { readTree, newFolder }