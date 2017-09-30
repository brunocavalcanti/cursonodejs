listar = () => {
    return SQL_ALL('select id, nome, email, fone, cidade from clientes', [])
}
obter = (id) => {
    return SQL_FIND_ID('select id, nome, email, fone, cidade from clientes where id = ?', id)
}
alterar = (id, cliente) => {
    if (cliente.id) {
        return SQL_UPDATE(`update clientes set nome=?, email=?, fone=?, cidade=? where id =${id}`, cliente, ['id', 'nome', 'email'])
    } else {
        return SQL_INSERT('insert into clientes (id, nome, email, fone, cidade) values (0, ?, ?, ?, ?)', cliente, ['id', 'nome', 'email'])
    }
}
apagar = (id) => {
    return SQL_DELETE('delete from clientes where id = ?', id);
}

inserir = (cliente) => {
    return SQL_INSERT('insert into clientes (id, nome, email, fone, cidade) values (0, ?, ?, ?, ?)', cliente, ['id', 'nome', 'email'])
}
module.exports = { listar, obter, alterar, apagar, inserir }