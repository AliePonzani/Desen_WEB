import multer from "multer";

import { Router } from "express";
import { deletarEvento, editarEvento, listarEventos, salvarEvento } from "../repository/eventoRepository.js";
import { alterarImagem } from "../repository/produtoRepository.js";

let servidor = Router();
const upload = multer({ dest: 'storage/evento' });

servidor.post('/evento', async (req, resp) => {
    try {
        let evento = req.body;
        await salvarEvento(evento);
        resp.status(200).json(evento);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/evento', async (req, resp) => {
    try {
        let eventos = await listarEventos();
        resp.status(200).json(eventos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.put('/evento/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const evento = req.body;
        await editarEvento(id, evento);
        resp.status(200).json(evento);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.delete("/evento/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        await deletarEvento(id);
        resp.status(200).json("Evento deletado com sucesso!");
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
})


servidor.put('/:link/imgEvento/:id', upload.single('imgEvento'), async (req, resp) => {
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


export default servidor;