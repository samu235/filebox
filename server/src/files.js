const fs = require('fs');
var walk    = require('walk');



 function readTree(dir) {
    let result=fs.readdirSync(dir, (err, files) => {
        files.forEach(file => {
            //console.log(file);
            //result.push(file)
        });
    });
    return result
    
   /*
   var files   = [];
    var walker  =await  walk.walk(dir, { followLinks: false });
    await walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        files.push(root + '/' + stat.name);
        next();
    });

    await walker.on('end', function() {
        console.log(files);
    });
    console.log(files)
    */

}

module.exports = {readTree}