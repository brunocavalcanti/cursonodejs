const UsuarioController = require('../controllers/usuarios')

module.exports = (app) => {
    app.get('/usuarios', UsuarioController.listar)
    app.get('/usuarios/:id', UsuarioController.obter)
    app.post('/usuarios', UsuarioController.inserir)
    app.put('/usuarios/:id', UsuarioController.alterar)
    app.delete('usuarios/:id', UsuarioController.apagar)
}