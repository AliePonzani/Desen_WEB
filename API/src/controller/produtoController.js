import multer from "multer";

import { Router } from "express";
import { alterarImagem, buscarProduto, buscarProdutosCardapio, buscarProdutosGrupo, deletarProduto, editarProduto, listarProdutos, salvarProduto } from "../repository/produtoRepository.js";
import { buscarCardapio } from "../repository/cardapioRepository.js";
import { buscarGrupo } from "../repository/grupoRepository.js";

let servidor = Router();
const upload = multer({ dest: 'storage/produto' });

servidor.post('/produto/:grupo/:cardapio', async (req, resp) => {
    try {
        let produto = req.body;
        let grupo = req.params.grupo;
        let cardapio = req.params.cardapio;
        let verificarGrupo = await buscarGrupo(grupo);
        let verificarCardapio = await buscarCardapio(cardapio);
        if (verificarGrupo.length < 1 || verificarCardapio.length < 1) {
            throw new Error("Grupo ou cardapio não encontrados!");
        }
        await salvarProduto(grupo, cardapio, produto);
        resp.status(200).json(produto);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/produto', async (req, resp) => {
    try {
        let produtos = await listarProdutos();
        resp.status(200).json(produtos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/produto/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let produto = await buscarProduto(id);
        if (produto.length < 1) {
            throw new Error("Produto não encontrado!");
        }
        resp.status(200).json(produto);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/produto/grupo/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let produtos = await buscarProdutosGrupo(id);
        // if (produtos.length < 1) {
        //     throw new Error("Nenhum produto encontrado!");
        // }
        resp.status(200).json(produtos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/produto/cardapio/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let produtos = await buscarProdutosCardapio(id);
        // if (produtos.length < 1) {
        //     // throw new Error("Nenhum produto encontrado!");
        //     resp.status(200).json(produtos);
        // }
        resp.status(200).json(produtos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.put('/produto/:cardapio/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        let cardapio = req.params.cardapio;
        const produto = req.body;
        await editarProduto(cardapio, id, produto);
        resp.status(200).json(produto);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.put('/:link/imgProduto/:id', upload.single('imgProduto'), async (req, resp) => {
    try {
        let id = req.params.id;
        let link = req.params.link;
        let imagem = req.file.path;
        let linhasAfetadas = await alterarImagem(link, id, imagem);
        if (linhasAfetadas == 0) {
            resp.status(404).send();
        }else{
            resp.status(202).send();
        }
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
})

servidor.delete("/produto/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        await deletarProduto(id);
        resp.status(200).json("Produto deletado com sucesso!");
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
})

export default servidor;