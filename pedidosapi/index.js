require('./globals')

const express = require('express')
const bodyParser = require('body-parser')
const app = express();

//rotas
const UsuariosRotas = require('./routes/usuarios')

app.use(bodyParser.json())

UsuariosRotas(app)

app.listen(PORTA);