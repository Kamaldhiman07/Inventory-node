const mongoose = require("mongoose");
const uri = "mongodb+srv://kamaljeetinsiderwebsolutions:rrhSpcqI9oFCpkI7@cluster0.nqichme.mongodb.net";


function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };