const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const tasksRoute = require('./routes/tasks')
const config = require('./config.json')
var app = express()


if(process.env.NODE_ENV === 'test'){
    config = require('./config_test.json')
}

app.use(bodyParser.json())

mongoose.connect(config.URL_MONGODB)
mongoose.connection.on('error', (error)=>{
    throw new Error(error)

})

//rotas
tasksRoute(app)

const porta = process.env.PORT || 3000;

app.listen(porta, ()=> console.log(`API rodando na porta ${porta}`))

module.exports = app

