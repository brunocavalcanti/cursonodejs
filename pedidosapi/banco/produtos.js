listar = () => {
    return new Promise((resolve, reject) => {
        MYSQL.query('select id, nome, foto, preco from produtos', [], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor'))
            } else {
                resolve(TRATAR_SUCESSO(200, data))
            }

        })

    })
}
obter = (id) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('select id, nome, foto, preco  from produtos where id=?', [id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor'))
            } else if (data.length == 0) {
                reject(TRATAR_ERROS(500, 'Produto não encontrado!'))
            } else {
                resolve(TRATAR_SUCESSO(200, data))
            }
        })

    })
}
alterar = (id, cliente) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('update produtos set nome=?, foto=?, preco=? where id=?', [produto.nome, produto.foto, produto.preco, id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows == 0) {
                reject(TRATAR_ERROS(404, 'Produto não encontrado para  alteração!'))
            } else {
                produto.id = id
                resolve(TRATAR_SUCESSO(200, produto))
            }
        })
    })
}

apagar = (id) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('delete from produtos where id =?', [id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows == 0) {
                reject(TRATAR_ERROS(404, 'Produto não encontrado para excluir!'))
            } else {
                resolve(TRATAR_SUCESSO(200, data.affectedRows))
            }
        })
    })
}
inserir = (produto) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('insert into produtos (nome, foto, preco) values (?,?,?)', [produto.nome, produto.foto, produto.preco], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else {
                produto.id = data.insertId
                resolve(TRATAR_SUCESSO(201, cliente))
            }

        })
    })
}
obterVariosIDs = (ids) => {
    return new Promise((resolve, reject) => {
        MYSQL.query(`select id, preco from produtos where id in (${ids})`, [], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.length == 0) {
                reject(TRATAR_ERROS(404, 'Produtos não encontrado'))
            } else {
                resolve(data)
            }
        })
    })
}
module.exports = { listar, obter, alterar, apagar, inserir, obterVariosIDs }