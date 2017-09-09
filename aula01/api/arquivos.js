const fs = require('fs')
fs.readFile('arquivo.txt',{encoding:"utf-8"}, (erro, data)=>{
    if (erro ) return console.log('erro ao abrir o arquivo: ', erro)
        data+= "\n opa" 
        fs.writeFile('arquivo.txt',data, (erro,data)=>{
            if(erro) return console.log("erro ao reescrever o arquivo")
        })
    
})
const arquivo = fs.readFileSync('arquivo.txt',{encoding:"utf-8"})
console.log(arquivo)