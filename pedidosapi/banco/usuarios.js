const crypto = require('crypto');
const SECRET_KEY = '12I3021I0!@#$$123O-1O=jdufudsfndsfsd==1;;/901ao-/*ka';

listar = () => {
    return SQL_ALL('select id, nome,email,senha, token from usuarios', [])
}
obter = (id) => {
    return SQL_FIND_ID('select id,nome,email from usuarios where id =?', id)
}
alterar = (id, usuario) => {
    usuario.senha = criptografarSenha(usuario.senha)
    if (usuario.id) {
        return SQL_UPDATE(`update usuarios set nome=?, email=?, senha=? where id=${id}`, usuario, ['nome', 'email', 'id'])
    } else {
        return SQL_INSERT('insert into usuarios(id,nome,email,senha) values(0,?,?,?,?)', usuario, ['nome', 'email', 'id'])
    }
}
apagar = (id) => {
    return SQL_DELETE('delete from usuarios where id=?', id)
}
inserir = (usuario) => {
    usuario.senha = criptografarSenha(usuario.senha)
    usuario.token = criptografarSenha(new Date().getTime().toString())
    return SQL_INSERT('insert into usuarios(id, nome, email, senha, token) values(0,?,?,?,?)', [usuario.nome, usuario.email, usuario.senha, usuario.token], ['nome', 'email', 'id','token'])
}

criptografarSenha = (senha) => {
    return crypto.createHmac('sha256', SECRET_KEY).update(senha).digest('hex')
}
validarToken = (token)=>{
    return SQL_ALL('select token from usuarios where token =?',[token],['token']);
}

module.exports = { listar, obter, alterar, apagar, inserir }