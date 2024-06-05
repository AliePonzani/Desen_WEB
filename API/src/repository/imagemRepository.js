import verificar from "./cardapioRepository.js";
import con from "../conection.js";

export async function salvarImagem(imagem) {
    let comando = `
            insert into imagem(
                titulo,
                carrossel
            )
            values (?, ?)
        `;

    let [resp] = await con.query(comando, [
        imagem.titulo,
        imagem.carrossel
    ]);
    imagem.id = resp.insertId;
    verificar(resp, imagem);
}

export async function listarImagens() {
    let comando = `SELECT * FROM imagem`;
    let resp = await con.query(comando, []);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function buscarImagemCarrossel(carrossel) {
    let comando = `
    SELECT * FROM imagem WHERE carrossel = ?`;
    let resp = await con.query(comando, [carrossel]);
    let linhas = resp.length;
    return verificar(linhas, resp[0]);
}

export async function editarImagem(id, imagem) {
    let comando = `
        UPDATE imagem SET
            titulo = ?,
            carrossel = ?
        WHERE id = ?
        `;

    let resp = await con.query(comando, [
        imagem.titulo,
        imagem.carrossel,
        id
    ]);
    verificar(resp, imagem);
}

export async function deletarImagem(id) {
    let comando = `DELETE FROM imagem WHERE id = ?`;
    let resp = await con.query(comando, [id]);
    verificar(resp[0].affectedRows, "");
}
