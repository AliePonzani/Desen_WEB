import verificar from "./cardapioRepository.js";
import con from "../conection.js";

export async function salvarEvento(evento) {
    let comando = `
            insert into evento(
                titulo,
                dataInicio,
                dataFim,
                valor,
                descricao
            )
            values (?, ?, ?, ?, ?)
        `;

    let [resp] = await con.query(comando, [
        evento.titulo,
        evento.dataInicio,
        evento.dataFim,
        evento.valor,
        evento.descricao
    ]);
    evento.id = resp.insertId;
    verificar(resp, evento);
}

export async function listarEventos() {
    let comando = `SELECT * FROM evento`;
    let resp = await con.query(comando, []);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function editarEvento(id, evento) {
    let comando = `
        UPDATE evento SET
            titulo = ?,
            dataInicio = ?,
            dataFim = ?,
            valor = ?,
            descricao = ?
        WHERE id = ?
        `;

    let resp = await con.query(comando, [
        evento.titulo,
        evento.dataInicio,
        evento.dataFim,
        evento.valor,
        evento.descricao,
        id
    ]);
    verificar(resp[0].affectedRows, evento);
}

export async function deletarEvento(id) {
    let comando = `DELETE FROM evento WHERE id = ?`;
    let resp = await con.query(comando, [id]);
    verificar(resp[0].affectedRows, "");
}
