import verificar from "./cardapioRepository.js";
import con from "../conection.js";

export async function salvarGrupo(cardapio, grupo) {
    let comando = `
            insert into grupo(
                nome,
                IdCardapio
            )
            values (?,?)
        `;
    let resp = await con.query(comando, [grupo.nome, cardapio]);
    let info = resp[0].affectedRows;
    grupo.id = info.insertId;
    verificar(resp, grupo);
}

export async function listaGrupos() {
    let comando = `select * from grupo`;
    let resp = await con.query(comando, []);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function buscarGrupo(id) {
    let comando = `SELECT * FROM grupo WHERE id = ?`;
    let resp = await con.query(comando, [id]);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function buscarGruposCardapio(id) {
    let comando = `SELECT * FROM grupo WHERE idCardapio = ?`;
    let resp = await con.query(comando, [id]);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function deletarGrupo(id) {
    let comando = `DELETE FROM grupo WHERE id = ?`;
    let resp = await con.query(comando, [id]);
    verificar(resp[0].affectedRows, "");
}