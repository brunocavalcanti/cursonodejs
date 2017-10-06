listar = () => {
    return new Promise((resolve, reject) => {
        MYSQL.query('select id, nome, email, fone, cidade from clientes', [], (err, data) => {
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
        MYSQL.query('select id, nome, email, fone, cidade  from clientes where id=?', [id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor'))
            } else if (data.length == 0) {
                reject(TRATAR_ERROS(500, 'Cliente não encontrado!'))
            } else {
                resolve(TRATAR_SUCESSO(200, data))
            }
        })
    })
}
alterar = (id, cliente) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('update clientes set nome=?, email=?, fone=? cidade=? where id=?', [cliente.nome, cliente.email, cliente.fone, cliente.cidade, id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows == 0) {
                reject(TRATAR_ERROS(404, 'Cliente não encontrado para  alteração!'))
            } else {
                cliente.id = id
                resolve(TRATAR_SUCESSO(200, cliente))
            }
        })
    })
}

apagar = (id) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('delete from clientes where id =?', [id], (err, odata) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows == 0) {
                reject(TRATAR_ERROS(404, 'Cliente não encontrado para excluir!'))
            } else {
                resolve(TRATAR_SUCESSO(200, data.affectedRows))
            }
        })
    })
}
inserir = (cliente) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('insert into clientes (nome, email, fone, cidade) values (?,?,?,?)', [cliente.nome, cliente.email, cliente.fone, cliente.cidade], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else {
                cliente.id = data.insertId
                resolve(TRATAR_SUCESSO(201, cliente))
            }

        })
    })
}
module.exports = { listar, obter, alterar, apagar, inserir }