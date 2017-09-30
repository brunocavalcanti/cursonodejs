const UsuariosBanco = require('../banco/usuarios')

listar = (req, res) => {
    return UsuariosBanco.listar().then(retorno => {
            res.status(retorno.status)
            res.json(retorno.data)
        })
        .catch(erro => {
            res.status(erro.status)
            res.json(erro.data)
        })
}
obter = (req, res) => {
    return UsuariosBanco.obter(req.params.id).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}
alterar = (req, res) => {
    return UsuariosBanco.alterar(req.params.id, req.body).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}

inserir = (req, res) => {
    return UsuariosBanco.inserir(req.body).then(retorno => {
        res.status(retorno.status)
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}
apagar = (req, res) => {
    return UsuariosBanco.apagar(req.params.id).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}

module.exports = { listar, obter, alterar, inserir, apagar }