const mysql = require('mysql')
global.PORTA = 8081

const MYSQL = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senha1',
    database: 'apipedidos'
})

global.SQL_ALL = (query, parametros) => {
    return new Promise((resolve, reject) => {
        MYSQL.query(query, parametros, (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (!data || data.length === 0) {
                reject(TRATAR_ERROS(404, 'Registros não encontrados'))
            } else {
                resolve(TRATAR_SUCESSO(200, data))
            }
        })
    })
}
global.SQL_INSERT = (query, objeto, camposRetorno) => {
    const arrayValores = Object.keys(objeto).map(par => { return objeto[par] });
    return new Promise((resolve, reject) => {
        MYSQL.query(query, arrayValores, (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else {
                objeto.id = data.insertId;
                resolve(TRATAR_SUCESSO(201, MONTAR_OBJETO_RETORNO(objeto, camposRetorno)))
            }
        })
    })
}
global.SQL_FIND_ID = (query, id) => {
    return new Promise((resolve, reject) => {
        MYSQL.query(query, [id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (!data || !data[0] || data.length === 0) {
                reject(TRATAR_ERROS(404, 'Registro não encontrado'))
            } else {
                resolve(TRATAR_SUCESSO(200, data[0]))
            }
        })
    })
}
global.SQL_UPDATE = (query, objeto, camposRetorno) => {
    const arrayValores = Object.keys(objeto).map(par => { return objeto[par] });
    return new Promise((resolve, reject) => {
        MYSQL.query(query, arrayValores, (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows === 0) {
                reject(TRATAR_ERROS(404, 'Registro não encontrado'))
            } else {
                resolve(TRATAR_SUCESSO(200, MONTAR_OBJETO_RETORNO(data, camposRetorno)))
            }
        })

    })
}
global.SQL_DELETE = (query, id) => {
    return new Promise((resolve, reject) => {
        MYSQL.query(query, [id], (err, data) => {
            if (err) {
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (data.affectedRows === 0) {
                reject(TRATAR_ERROS(404, 'Registro não encontrado'))
            } else {
                resolve(TRATAR_SUCESSO(200, data.affectedRows))
            }
        })
    })
}
const MONTAR_OBJETO_RETORNO = (objeto, campos) => {
    var retorno = {}
    campos.forEach((valor) => {
        retorno[valor] = objeto[valor]
    }, this);
    return retorno
}
const TRATAR_ERROS = (statuscode, mensagem) => {
    const retorno = { mensagem: mensagem }
    return { status: statuscode, data: retorno }
}
const TRATAR_SUCESSO = (statuscode, data) => {
    return { status: statuscode, data: data }
}