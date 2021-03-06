const PedidosBanco = require('../banco/pedidos')

listar = (req, res) => {
    return PedidosBanco.listar().then(retorno => {
            res.status(retorno.status)
            res.json(retorno.data)
        })
        .catch(erro => {
            res.status(erro.status)
            res.json(erro.data)
        })
}
obter = (req, res) => {
    return PedidosBanco.obter(req.params.id).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}
alterar = (req, res) => {
    return PedidosBanco.alterar(req.params.id, req.body).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}

inserir = (req, res) => {
    return PedidosBanco.inserir(req.body).then(retorno => {
        res.status(retorno.status)
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}
apagar = (req, res) => {
    return PedidosBanco.apagar(req.params.id).then(retorno => {
        res.status(retorno.status);
        res.json(retorno.data)
    }).catch(erro => {
        res.status(erro.status);
        res.json(erro.data)
    })
}

module.exports = { listar, obter, alterar, inserir, apagar }