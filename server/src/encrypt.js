const bcrypt = require("bcryptjs")

const rondasDeSal = 11

async function newEncript (value){
    const word = await bcrypt.hash(value, rondasDeSal)
    console.log("hast = "+word)

    return word
}

async function compare (plane, texthas){
    const result = await bcrypt.compare(plane, texthas)

    console.log("compare = "+result)
    return result
}

module.exports = {newEncript,compare}