import con from "./conection.js";

export async function salvarGrupo(subcategoria, grupo) {
    try {
        
        let comando = `
            insert into grupos(
                nomeGrupo,
                subcategoriaGrupo
            )
            values (?,?)
        `;

        let resp = await con.query(comando, [grupo.nomeGrupo, subcategoria]);
        let info = resp[0];
        grupo.id = info.insertId;

        if (resp[0].affectedRows !== 1) {
            throw new Error('Erro ao cadastrar Grupo!');
        }

        return grupo;
    } catch (error) {
        throw new Error('Erro ao executar o comando SQL: ' + error.message);
    }

}

export async function listaGrupos() {
    try {
        let comando = `select * from grupos`;

        let resp = await con.query(comando, []);
        let linhas = resp[0];

        if (linhas.length === 0) {
            throw new Error('Nenhum grupo encontrado!');
        }

        return linhas;
    } catch (error) {
        throw new Error('Erro ao executar a consulta SQL: ' + error.message);
    }
}

export async function listarGrupo(id) {
    try {
        let comando = `SELECT * FROM grupos WHERE idGrupo = ?`;

        let resp = await con.query(comando, [id]);
        let linhas = resp[0];
        if (linhas.length === 0) {
            throw new Error('Grupo não encontrado!');
        }
        // Retorna a primeira linha encontrada (supondo que só deve haver uma subcategoria com o ID especificado)
        return linhas[0];
    } catch (error) {
        throw new Error('Erro ao executar a consulta SQL: ' + error.message);
    }
}

export async function listarGruposSubcategoria(id) {
    try {
        let comando = "SELECT * FROM grupos WHERE subcategoriaGrupo = ?"
        let resp = await con.query(comando, [id]);
        let linhas = resp[0];
        return linhas;
    } catch (error) {
        throw new Error('Erro ao executar o comando SQL: ' + error.message);
    }
}

export async function editarGrupo(subcategoria, id, grupo) {
    try {
        let comando = `
        UPDATE grupos SET
        nomeGrupo = ?,
        subcategoriaGrupo = ?
        WHERE idGrupo = ?
        `;

        let resp = await con.query(comando, [
            grupo.nomeGrupo,
            subcategoria,
            id
        ]);

        if (resp[0].affectedRows !== 1) {
            throw new Error('Grupo não encontrado ou não atualizado');
        }
        return grupo;
    } catch (error) {
        throw new Error('Erro ao executar a consulta SQL: ' + error.message);
    }
}

//verifica o DELETE das tabelas relacionadas
export async function deletarGrupo(id, grupo) {
    try {
        let comando = `
            DELETE FROM grupos WHERE idGrupo = ?
        `;

        let resp = await con.query(comando, [id]);

        if (resp[0].affectedRows !== 1) {
            throw new Error('grupo não DELETADO');
        }

        return grupo;
    } catch (error) {
        throw new Error('Erro ao executar SQL: ' + error.message);
    }
}



