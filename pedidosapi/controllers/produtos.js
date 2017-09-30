const ProdutosBanco = require('../banco/produtos')

listar = (req, res) => {
    return ProdutosBanco.listar().then(retorno => {
            res.status(retorno.status)
            res.json(retorno.data)
        })
        .catch(erro => {
            res.status(erro.status)
            res.json(erro.data)
        })
}
obter = (req, res) => {
    return ProdutosBanco.obter(req.params.id).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}
alterar = (req, res) => {
    return ProdutosBanco.alterar(req.params.id, req.body).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}

inserir = (req, res) => {
    return ProdutosBanco.inserir(req.body).then(retorno => {
        res.status(retorno.status)
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}
apagar = (req, res) => {
    return ProdutosBanco.apagar(req.params.id).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}

module.exports = { listar, obter, alterar, inserir, apagar }