const http = require("http");
const url = require("url")
const PORTA = 3000
var tickets =[];

http.createServer((req, res)=>{
    console.log(req.method)
    if(req.method === "GET" && req.url === "/"){
        return res.end('{message: "Bem vindo a primeira api rest"}');
        
    }
    if(req.method === "GET" && req.url === "/tickets"){
        return res.end(JSON.stringify(tickets));
    }
  
    if(req.method ==="GET" && req.url.match("/tickets/") ){
        var parametro = req.url.replace("/tickets/","")
        var ticket = tickets.filter(t => t.codigo === parseInt(parametro))
        if(ticket.length >0){
            return res.end(JSON.stringify(ticket[0]));   
        }
        res.writeHead(404)
        res.end('Não encontrado')
        return
    }
    if(req.method ==="DELETE" && req.url.match("/tickets/") ){
        var parametro = req.url.replace("/tickets/","")
        tickets = tickets.filter(t => t.codigo !== parseInt(parametro))
        res.writeHead(200);   
        res.end('Registro apagado')
        return
    }



    if(req.method === "POST" && req.url === "/tickets"){
        var body =[]
      return req.on('data', (data)=>{
            body.push(data)
    
        }).on('end',()=>{
            body = Buffer.concat(body).toString();
            var ticket = JSON.parse(body);
            ticket.codigo = new Date().getTime();
            tickets.push(ticket); 
            return res.end(JSON.stringify(ticket),3);   
            
        } )
    }
    if (req.method ==="PUT" && req.url === "/tickets"){
        var body = []
        return req.on('data', (data)=>{
            body.push(data)
        }).on('end', ()=>{
            body = Buffer.concat(body).toString();
            var ticket = JSON.parse(body);
            const indice = tickets.indexOf(ticket)
            if(indice >=0){
                tickets[indice] = ticket
            } else {
                tickets.push(ticket);
            }
            return res.end(JSON.stringify(ticket));
        })

    }

    res.writeHead(404,{'Content-Type': 'application/json; charset=utf-8'})
    res.end('Não encontrado')

}).listen(PORTA)
console.log(`webserver rodando na porta ${PORTA} (CTRL+C)`)
