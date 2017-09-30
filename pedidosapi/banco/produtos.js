
listar = () => {
    return SQL_ALL('select id, nome, foto,preco from produtos', [])
}
obter = (id) => {
    return SQL_FIND_ID('select id, nome, foto, preco from produtos where id = ?', id)
}
alterar = (id, produto) => {
    if (produto.id) {
        return SQL_UPDATE(`update produtos set nome=?, foto=?, preco=? where id =${id}`, produto, ['id', 'nome', 'preco'])
    } else {
        return SQL_INSERT('insert into produtos (id, nome, foto, preco) values (0, ?, ?, ?)', produto, ['id', 'nome', 'preco'])
    }
}
apagar = (id) => {
    return SQL_DELETE('delete from produtos where id = ?', id);
}

inserir = (produto) => {
    return SQL_INSERT('insert into produtos (id, nome, foto, preco) values (0, ?, ?, ?)', produto, ['id', 'nome', 'preco'])
}
module.exports = { listar, obter, alterar, apagar, inserir }