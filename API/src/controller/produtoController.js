import multer from "multer";

import { salvarProduto, editarProduto, listarProdutos, deletarProduto, listarUmProduto, listarProdutoGrupo, listarProdutosSubcategoria,alterarImagem } from "../repository/produtoRepository.js";
import { listarSucategoria } from "../repository/subcategoriaRepository.js";

import { Router } from "express";
import { listarGrupo } from "../repository/gruposRepository.js";
let servidor = Router();

const upload = multer({ dest: 'storage/produtos' });

servidor.put('/produto/imagem/:id', upload.single('imgProduto'), async (req, resp) => {
    try {
        let id = req.params.id;
        let imagem = req.file.path;

        let linhasAfetadas = await alterarImagem(id, imagem);
        if (linhasAfetadas == 0) {
            resp.status(404).send();
        } else {
            resp.status(202).send();
        }
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }

})

servidor.post('/produto/:subcategoria', async (req, resp) => {
    try {
        let produto = req.body;
        let subcategoria = req.params.subcategoria;
        await listarSucategoria(subcategoria);
        await listarGrupo(grupo);

        let produtoInserido = await salvarProduto(subcategoria, produto);
        resp.status(200).json(produtoInserido);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/produto', async (req, resp) => {
    try {
        let listaProdutos = await listarProdutos();
        if (listaProdutos.length === 0) {
            return resp.status(204).send("Nenhum produto encontrado!");
        }
        resp.status(200).json(listaProdutos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
})

servidor.get('/produto/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        let listaProduto = await listarUmProduto(id);
        if (listaProduto.length < 1) {
            throw new Error("Produto não cadastrado!");
        }
        resp.status(200).json(listaProduto);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
})

servidor.get('/produto/grupo/:grupo', async (req, resp) => {
    try {
        const grupo = req.params.grupo;
        let listaProduto = await listarProdutoGrupo(grupo);
        if (listaProduto.length < 1) {
            throw new Error("Grupo não existe ou nenhum produto cadastrado nele!");
        }
        resp.status(200).json(listaProduto);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
})

servidor.get('/produto/subcategoria/:id', async (req, resp) => {
    try {
        let subcategoria = req.params.id;
        let listaProdutos = await listarProdutosSubcategoria(subcategoria);
        resp.status(200).json(listaProdutos);
    } catch (error) {
        resp.status(500).json({ message: `Erro ao buscar produtos da subcategoria ${id}`, error: error.message });
    }
});


servidor.put('/produto/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const produto = req.body;
        const produtoAtualizado = await editarProduto(id, produto);
        resp.status(200).json(produtoAtualizado);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.delete('/produto/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        await deletarProduto(id);
        resp.status(200).json("produto excluido com sucesso!");
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});


export default servidor;