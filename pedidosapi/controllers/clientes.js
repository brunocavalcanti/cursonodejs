const ClientesBanco = require('../banco/clientes')

listar = (req, res) => {
    return ClientesBanco.listar().then(retorno => {
            res.status(retorno.status)
            res.json(retorno.data)
        })
        .catch(erro => {
            res.status(erro.status)
            res.json(erro.data)
        })
}
obter = (req, res) => {
    return ClientesBanco.obter(req.params.id).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}
alterar = (req, res) => {
    return ClientesBanco.alterar(req.params.id, req.body).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}

inserir = (req, res) => {
    return ClientesBanco.inserir(req.body).then(retorno => {
        res.status(retorno.status)
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}
apagar = (req, res) => {
    return ClientesBanco.apagar(req.params.id).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}

module.exports = { listar, obter, alterar, inserir, apagar }