const print = require("./print")
const server = require("./server")

server((req,res)=>{
    const file = print.getFile();
    res.end(file)
})



