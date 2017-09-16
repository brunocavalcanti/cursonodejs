const http = require("http")

module.exports = (server)=>{
    http.createServer(server).listen(3000)
}