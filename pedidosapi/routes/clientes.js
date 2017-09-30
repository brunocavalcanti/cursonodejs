const ClientesController = require('../controllers/clientes')

module.exports = (app) => {
    app.get('/clientes', ClientesController.listar)
    app.get('/clientes/:id', ClientesController.obter)
    app.post('/clientes', ClientesController.inserir)
    app.put('/clientes/:id', ClientesController.alterar)
    app.delete('clientes/:id', ClientesController.apagar)
}