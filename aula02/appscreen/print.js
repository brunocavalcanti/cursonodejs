const path = require("path")
const cp   = require("child_process")
const fs   = require("fs")

module.exports.getFile = ()=>{
    var filename = path.join(__dirname,'print.png')    

    if(process.platform === "darwin"){
        cp.execSync("screencapture print.jpg",{cdw: __dirname})
        filename = path.join(__dirname,'print.jpg')        
        contentType = 'image/jpeg'
     }else if (process.platform === "linux"){
         cp.execSync("scrot print.png",{cdw: __dirname})
     }else if (process.platform === "win32"){ 
         cp.execSync("nircmd.exe savescreenshot print.png",{cdw: __dirname})
     }

    const file = fs.readFileSync(filename)
    fs.unlink(filename)

     return file;


}