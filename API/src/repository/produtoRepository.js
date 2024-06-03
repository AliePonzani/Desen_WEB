import verificar from "./cardapioRepository.js";
import con from "../conection.js";

export async function salvarProduto(grupo, cardapio, produto) {
    let comando = `
        insert into produto (
            nome, 
            descricao, 
            valor, 
            peso,
            idGrupo,
            idCardapio
            )
        values (?, ?, ?, ?, ?, ?)
        `;

    let [result] = await con.query(comando, [
        produto.nome,
        produto.descricao,
        produto.valor,
        produto.peso,
        grupo,
        cardapio
    ]);
    produto.id = result.insertId;
    verificar(result, produto);
}

export async function listarProdutos() {
    let comando = `
    SELECT 
        produto.*,
        cardapio.nome AS nome_cardapio,
        grupo.nome AS nome_grupo
    FROM 
        produto
    JOIN 
        cardapio ON produto.idCardapio = cardapio.id
    JOIN 
        grupo ON produto.idGrupo = grupo.id;
    `;
    let resp = await con.query(comando, []);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function buscarProduto(id) {
    let comando = `
    SELECT 
        produto.*,
        cardapio.nome AS nome_cardapio,
        grupo.nome AS nome_grupo
    FROM 
        produto
    JOIN 
        cardapio ON produto.idCardapio = cardapio.id
    JOIN 
        grupo ON produto.idGrupo = grupo.id
    WHERE 
        produto.id = ?;
    `;
    let resp = await con.query(comando, [id]);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function buscarProdutosCardapio(id) {
    let comando = `
    SELECT 
        produto.*,
        cardapio.nome AS nome_cardapio,
        grupo.nome AS nome_grupo
    FROM 
        produto
    JOIN 
        cardapio ON produto.idCardapio = cardapio.id
    JOIN 
        grupo ON produto.idGrupo = grupo.id
    WHERE 
        produto.idCardapio = ?;
    `;
    let resp = await con.query(comando, [id]);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function buscarProdutosGrupo(id) {
    let comando = `
    SELECT 
        produto.*,
        cardapio.nome AS nome_cardapio,
        grupo.nome AS nome_grupo
    FROM 
        produto
    JOIN 
        cardapio ON produto.idCardapio = cardapio.id
    JOIN 
        grupo ON produto.idGrupo = grupo.id
    WHERE 
        produto.idGrupo = ?;
    `;
    let resp = await con.query(comando, [id]);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function editarProduto(grupo, cardapio, id, produto) {
    let comando = `
        UPDATE produto SET
        nome = ?, 
        descricao = ?, 
        valor = ?, 
        peso = ?,
        idGrupo = ?,
        idCardapio = ?
        WHERE id = ?
        `;
    let resp = await con.query(comando, [
        produto.nome,
        produto.descricao,
        produto.valor,
        produto.peso,
        grupo,
        cardapio,
        id
    ]);
    verificar(resp[0].affectedRows, produto);
}

export async function deletarProduto(id) {
    let comando = `DELETE FROM produto WHERE id = ?`;
    let resp = await con.query(comando, [id]);
    verificar(resp[0].affectedRows, "");
}

export async function alterarImagem(link, id, caminho) {
    let comando = `
            update ${link} set 
                imagem = ?
            where id = ?
            `;
    let resp = await con.query(comando, [caminho, id]);
    let linhas = resp.affectedRows;
    console.log(verificar(linhas, caminho));
    return verificar(linhas, caminho);
}