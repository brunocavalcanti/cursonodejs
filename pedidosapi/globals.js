const mysql = require('mysql')
global.PORTA = 8081

global.MYSQL = mysql.createPool({
    connectionLimit: 100,
    host     : 'apipedidos.chlibe6ny0si.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'admin123',
    database : 'cafepedido'
})


global.SQL_ALL = (query, parametros) => {
    console.log(query)
    return new Promise((resolve, reject) => {
        MYSQL.query(query, parametros, (err, data) => {
            if (err) {
                console.log(err)
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else if (!data || data.length === 0) {
                reject(TRATAR_ERROS(404, 'Registros não encontrados'))
            } else {
                resolve(TRATAR_SUCESSO(200, data))
            }
        })
    })
}
global.SQL_INSERT = (query, valores, camposRetorno) => {
    return new Promise((resolve, reject) => {
        MYSQL.query(query, valores, (err, data, fields) => {
            if (err) {
                console.log(err)
                reject(TRATAR_ERROS(500, 'Erro no servidor!'))
            } else {
                console.log(fields)
                data.id = data.insertId
                if (data.affectedRows > 1){
                    console.log("correto")
                    resolve(data)
                }else {
                    resolve(TRATAR_SUCESSO(201, MONTAR_OBJETO_RETORNO(data, camposRetorno)))
                }
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
global.SQL_UPDATE = (query, valores, camposRetorno) => {
    const arrayValores = Object.keys(objeto).map(par => { return objeto[par] });
    return new Promise((resolve, reject) => {
        MYSQL.query(query, valores, (err, data) => {
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
    console.log(objeto)
    var retorno = {}
    campos.forEach((valor) => {
        retorno[valor] = objeto[valor]
    }, this);
    return retorno
}
global.TRATAR_ERROS = (statuscode, mensagem) => {
    const retorno = { mensagem: mensagem }
    return { status: statuscode, data: retorno }
}
global.TRATAR_SUCESSO = (statuscode, data) => {
    return { status: statuscode, data: data }
}