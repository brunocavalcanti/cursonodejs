const ProdutosController = require('../controllers/produtos')

module.exports = (app) => {
    app.get('/produtos', ProdutosController.listar)
    app.get('/produtos/:id', ProdutosController.obter)
    app.post('/produtos', ProdutosController.inserir)
    app.put('/produtos/:id', ProdutosController.alterar)
    app.delete('produtos/:id', ProdutosController.apagar)
}