import con from "./conection.js";

export async function salvarProduto(subcategoria, produto) {
    try {
        let comando = `
        insert into produto (
            nomeProduto, 
            descricaoProduto, 
            valorProduto, 
            pesoProduto,
            grupoProduto,
            subcategoriaProduto
            )
        values (?, ?, ?, ?, ?, ?)
        `

        let resp = await con.query(comando, [
            produto.nomeProduto,
            produto.descricaoProduto,
            produto.valorProduto,
            produto.pesoProduto,
            grupo.grupoProduto,
            subcategoria
        ]);
        let info = resp[0];

        produto.id = info.insertId;

        if (resp[0].affectedRows !== 1) {
            throw new Error('Erro ao cadastrar produto');
        }

        return produto;
    } catch (error) {
        throw new Error('Erro ao executar o comando SQL: ' + error.message);
    }

}

export async function listarProdutos() {
    try {
        let comando = `select produto.*, subcategoria.nomeSubcategoria, grupos.nomeGrupo 
        from produto 
        inner join subcategoria on produto.subcategoriaProduto = subcategoria.idSubcategoria
        inner join grupos on produto.grupoProduto = grupos.idGrupo
        `
        let resp = await con.query(comando, []);
        let linhas = resp[0];
        return linhas;
    } catch (error) {
        throw new Error('Erro ao executar o comando SQL: ' + error.message);
    }
};

// metodo para listar apenas um produto 
export async function listarUmProduto(id) {
    try {
        let comando = `SELECT * FROM produto WHERE idProduto = ?`;
        let resp = await con.query(comando, [id]);
        let linhas = resp[0];
        return linhas;
    } catch (error) {
        throw new Error('Erro ao executar o comando SQL: ' + error.message);
    }

};

export async function listarProdutosSubcategoria(id) {
    try {
        let comando = "SELECT * FROM produto WHERE SubcategoriaProduto = ?"

        let resp = await con.query(comando, [id]);
        let linhas = resp[0];

        return linhas;
    } catch (error) {
        throw new Error('Erro ao executar a consulta SQL: ' + error.message);
    }
}

export async function listarProdutoGrupo(grupo) {
    try {
        let comando = `SELECT * FROM produto WHERE grupoProduto = ?`;
        let resp = await con.query(comando, [grupo]);
        let linhas = resp[0];
        return linhas;
    } catch (error) {
        throw new Error('Erro ao executar o comando SQL: ' + error.message);
    }

};

export async function editarProduto(id, produto) {
    try {
        let comando = `
            UPDATE produto SET 
            nomeProduto = ?, 
            descricaoProduto = ?, 
            valorProduto = ?, 
            pesoProduto = ?,
            grupoProduto = ?
            WHERE idProduto = ?
        `;

        let resp = await con.query(comando, [
            produto.nomeProduto,
            produto.descricaoProduto,
            produto.valorProduto,
            produto.pesoProduto,
            produto.grupoProduto,
            id
        ]);

        if (resp[0].affectedRows !== 1) {
            throw new Error('Produto não encontrado ou não atualizado!');
        }

        return produto;
    } catch (error) {
        throw new Error('Erro ao executar o comando SQL: ' + error.message);
    }
}


export async function deletarProduto(id, produto) {
    try {
        let comando = `DELETE FROM produto WHERE idProduto = ?`;
        let resp = await con.query(comando, [id]);

        if (resp[0].affectedRows !== 1) {
            throw new Error('Produto não DELETADO');
        }
        return produto;
    } catch (error) {
        throw new Error('Erro ao executar o comando SQL: ' + error.message);
    }
}

export async function alterarImagem(id, caminho) {
    try {
        let comando = `
      update produto
         set imagem = ?
       where idProduto = ?
    `
  
    let resp = await con.query(comando, [caminho, id]);
    let info = resp[0];
  
    return info.affectedRows;
    } catch (error) {
        throw new Error('Erro ao executar o comando SQL: ' + error.message);
    }
    
  }