import { deletarGrupo, editarGrupo, listaGrupos, listarGrupo, listarGruposSubcategoria, salvarGrupo } from "../repository/gruposRepository.js";
import { listarProdutoGrupo } from "../repository/produtoRepository.js";
import { listarSucategoria } from "../repository/subcategoriaRepository.js";

import { Router } from "express";
let servidor = Router();

servidor.post('/grupo/:subcategoria', async (req, resp) => {
    try {
        let grupo = req.body;
        let subcategoria = req.params.subcategoria;
        let lista = await listarSucategoria(subcategoria);
        if (lista.length < 1) {
            throw new Error("Nenhuma subcategoria Encontrada!");
        }
        let grupoInserido = await salvarGrupo(subcategoria, grupo);
        resp.status(200).json(grupoInserido);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/grupo', async (req, resp) => {
    try {
        let grupos = await listaGrupos();
        resp.status(200).json(grupos);
    } catch (error) {
        resp.status(500).json({ message: 'Erro ao listar grupos', error: error.message });
    }
});

servidor.get('/grupo/:id', async (req, resp) => {
    try {
        let grupo = req.params.id;
        let exibirGrupo = await listarGrupo(grupo);
        resp.status(200).json(exibirGrupo);
    } catch (error) {
        resp.status(500).json({ message: 'Erro ao buscar grupo', error: error.message });
    }
});

servidor.get('/grupo/subcategoria/:id', async (req, resp) => {
    try {
        let subcategoria = req.params.id;
        let grupos = await listarGruposSubcategoria(subcategoria);
        if (grupos.length < 1) {
            throw new Error("Nenhum grupo Encontrado!");
        }
        resp.status(200).json(grupos);
    } catch (error) {
        resp.status(404).json({ error: error.message });
    }
});

servidor.put('/grupo/:subcategoria/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const subcategoria = req.params.subcategoria;
        const grupo = req.body;

        const grupoAtualizado = await editarGrupo(subcategoria, id, grupo);

        resp.status(200).json(grupoAtualizado);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.delete('/grupo/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const produtosGrupo = await listarProdutoGrupo(id);
        if (produtosGrupo.length > 0) {
            for (const produto of produtosGrupo) {
                await deletarProduto(produto.idProduto, produto);
            }
        }
        await deletarGrupo(id);
        resp.status(200).json("grupo excluido com sucesso!");
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});


export default servidor;