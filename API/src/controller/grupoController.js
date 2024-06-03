import { Router } from "express";
import { buscarGrupo, buscarGruposCardapio, deletarGrupo, listaGrupos, salvarGrupo } from "../repository/grupoRepository.js";
import { buscarCardapio } from "../repository/cardapioRepository.js";
import { buscarProdutosGrupo, deletarProduto } from "../repository/produtoRepository.js";
let servidor = Router();

servidor.post('/grupo/:cardapio', async (req, resp) => {
    try {
        let grupo = req.body;
        const cardapio = req.params.cardapio;
        let cardapios = await buscarCardapio(cardapio);
        if (cardapios.length < 1) {
            throw new Error("Cardapio não encontrado!");
        }
        await salvarGrupo(cardapio, grupo);
        resp.status(200).json(grupo);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/grupo', async (req, resp) => {
    try {
        let grupos = await listaGrupos();
        resp.status(200).json(grupos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/grupo/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let grupo = await buscarGrupo(id);
        if (grupo.length < 1) {
            throw new Error("Grupo não encontrado!");
        }
        resp.status(200).json(grupo);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/grupo/cardapio/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let grupos = await buscarGruposCardapio(id);
        resp.status(200).json(grupos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.delete("/grupo/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const produtosDoGrupo = await buscarProdutosGrupo(id);
        if (produtosDoGrupo.length > 0) {
            for (const produto of produtosDoGrupo) {
                await deletarProduto(produto.id);
            }
        }
        await deletarGrupo(id);
        resp.status(200).json("Grupo deletado com sucesso!");
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
})


export default servidor;