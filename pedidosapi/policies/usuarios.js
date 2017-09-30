const  UsuarioBanco = require('../banco/usuarios')

validarToken = (req, res, next) =>{
    if(!req.headers.token) return TRATAR_ERRO(res,401,'Informe o token')
    UsuarioBanco.obterToken(req.headers.token).then(retorno =>{
        req.data = retorno
        next()
    }).catch(erro=> {
        if(erro.status === 500) return TRATAR_ERRO(res,erro.status, 'Não foi possível verificar o token!')
        if(erro.status === 404) return TRATAR_ERRO(res,erro.stats,'Token não encontrado!')
    }) 
}
module.exports = {validarToken}
