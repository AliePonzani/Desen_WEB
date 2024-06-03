import con from "../conection.js";

export default function verificar(resp, dados) {
    try {
        if (resp === 0) {
            throw new Error("Erro ao realizar operação!");
        }
        return dados;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function salvarCardapio(cardapio) {
    let comando = `
            insert into cardapio(
                nome
            )
            values (?)
        `;
        
    let [result] = await con.query(comando, [cardapio.nome]);
    cardapio.id = result.insertId;
    verificar(result, cardapio);
}


export async function listarCardapios() {
    let comando = `SELECT * FROM cardapio`;
    let resp = await con.query(comando, []);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function buscarCardapio(id) {
    let comando = `SELECT * FROM cardapio WHERE id = ?`;
    let resp = await con.query(comando, [id]);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function editarCardapio(id, cardapio) {
    let comando = `
        UPDATE cardapio SET
        nome = ?
        WHERE id = ?
        `;
    let resp = await con.query(comando, [
        cardapio.nome,
        id
    ]);
    verificar(resp, cardapio);
}

export async function deletarCardapio(id) {
    let comando = `DELETE FROM cardapio WHERE id = ?`;
    let resp = await con.query(comando, [id]);
    verificar(resp[0].affectedRows, "");
}
