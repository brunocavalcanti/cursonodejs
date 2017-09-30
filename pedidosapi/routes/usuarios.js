const UsuariosController = require('../controllers/usuarios')

module.exports = (app) => {
    app.get('/usuarios', UsuariosController.listar)
    app.get('/usuarios/:id', UsuariosController.obter)
    app.post('/usuarios', UsuariosController.inserir)
    app.put('/usuarios/:id', UsuariosController.alterar)
    app.delete('usuarios/:id', UsuariosController.apagar)
}