require('./globals')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())

//rotas
require('./routes/usuarios')(app)
require('./routes/produtos')(app)


app.listen(PORTA);