const crypto = require('crypto');
const SECRET_KEY = '12I3021I0!@#$$123O-1O=jdufudsfndsfsd==1;;/901ao-/*ka';

listar = () => {
    return new Promise((resolve, reject) => {
        MYSQL.query('select id, nome,email,senha, token from usuarios', [], (err, data) => {
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
        MYSQL.query('select id, nome, email  from usuarios where id=?', [id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor'))
            } else if (data.length == 0) {
                reject(TRATAR_ERROS(500, 'Usuário não encontrado!'))
            } else {
                resolve(TRATAR_SUCESSO(200, data))
            }
        })

    })
}
alterar = (id, usuario) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('update usuarios set nome=?, email=? where id=?', [usuario.nome, usuario.email, id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows == 0) {
                reject(TRATAR_ERROS(404, 'Usuário não encontrado para  alteração!'))
            } else {
                usuario.id = id
                resolve(TRATAR_SUCESSO(200, usuario))
            }

        })

    })

}


apagar = (id) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('delete from usuarios where id =?', [id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows == 0) {
                reject(TRATAR_ERROS(404, 'Usuário não encontrado para excluir!'))
            } else {
                resolve(TRATAR_SUCESSO(200, data.affectedRows))
            }
        })
    })
}
inserir = (usuario) => {
    usuario.senha = criptografarSenha(usuario.senha)
    usuario.token = criptografarSenha(new Date().getTime().toString())
    return new Promise((resolve, reject) => {
        MYSQL.query('insert into usuarios (nome, email, senha, token) values (?,?,?,?)', [usuario.nome, usuario.email, usuario.senha, usuario.token], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else {
                usuario.id = data.insertId
                delete usuario.senha
                resolve(TRATAR_SUCESSO(201, usuario))
            }

        })
    })
}
alterarSenha = (id, senha) => {
    senha = criptografarSenha(senha)
    return new Promise((resolve, reject) => {
        MYSQL.query('update usuarios set senha =? where id = ?', [senha, id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows == 0) {
                reject(TRATAR_ERROS(404, 'Usuário não encontrado para excluir!'))
            } else {
                resolve(TRATAR_SUCESSO(200, data.affectedRows))
            }

        })

    })
}
criptografarSenha = (senha) => {
    return crypto.createHmac('sha256', SECRET_KEY).update(senha).digest('hex')
}
validarToken = (token) => {
    return new Promise((resolve, reject) => {
        MYSQL.query('select token from usuarios where token = ?', [token], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows == 0)
        })
    })
}

module.exports = { listar, obter, alterar, apagar, inserir, alterarSenha }