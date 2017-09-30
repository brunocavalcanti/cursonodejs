const PedidosController = require('../controllers/pedidos')

module.exports = (app) => {
    app.get('/pedidos', PedidosController.listar)
    app.get('/pedidos/:id', PedidosController.obter)
    app.post('/pedidos', PedidosController.inserir)
    app.put('/pedidos/:id', PedidosController.alterar)
    app.delete('pedidos/:id', PedidosController.apagar)
}