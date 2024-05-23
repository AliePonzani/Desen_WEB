

import { Router } from "express";
import { buscarCardapio, deletarCardapio, editarCardapio, listarCardapios, salvarCardapio } from "../repository/cardapioRepository.js";
import { buscarGruposCardapio, deletarGrupo } from "../repository/grupoRepository.js";
let servidor = Router();

servidor.post('/cardapio', async (req, resp) => {
    try {
        let cardapio = req.body;
        await salvarCardapio(cardapio);
        resp.status(200).json(cardapio);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/cardapio', async (req, resp) => {
    try {
        let cardapios = await listarCardapios();
        resp.status(200).json(cardapios);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/cardapio/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let cardapio = await buscarCardapio(id);
        if (cardapio.length < 1) {
            throw new Error("Cardapio não encontrado!");
        }
        resp.status(200).json(cardapio);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.put('/cardapio/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const cardapio = req.body;
        await editarCardapio(id, cardapio);
        resp.status(200).json(cardapio);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.delete("/cardapio/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const gruposDoCardapio = await buscarGruposCardapio(id);
        if (gruposDoCardapio.length > 0) {
            for (const grupo of gruposDoCardapio) {
                await deletarGrupo(grupo.id);
            }
        }
        await deletarCardapio(id);
        resp.status(200).json("Cardápio deletado com sucesso!");
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
})

export default servidor;



