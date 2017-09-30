require('./globals')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())

//rotas
usuariosRota = require('./routes/usuarios')
clientesRota = require('./routes/clientes')
produtosRota = require('./routes/produtos')
pedidosRotas = require('./routes/pedidos')

usuariosRota(app)
clientesRota(app)
produtosRota(app)
pedidosRotas(app)

app.listen(PORTA,()=>{
    console.log('api rodando')
});