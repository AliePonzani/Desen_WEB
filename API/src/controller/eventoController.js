import multer from "multer";

import { salvarEvento, editarEvento, listarEventos, deletarEvento, listarUmEvento ,alterarImagem} from "../repository/eventoRepository.js"

import { Router } from "express";
let servidor = Router();


const upload = multer({ dest: 'storage/eventos' })

servidor.put('/evento/imagem/:id', upload.single('imgEvento'), async (req, resp) => {
    try {
        let id = req.params.id;
        let imagem = req.file.path;

        let linhasAfetadas = await alterarImagem(id,imagem);
        if (linhasAfetadas == 0) {
            resp.status(404).send();
        }else{
            resp.status(202).send();
        }
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }

})

servidor.post('/evento', async (req, resp) => {
    try {
        let evento = req.body;
        let eventoInserido = await salvarEvento(evento);
        resp.status(200).json(eventoInserido);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/evento', async (req, resp) => {
    try {
        let listaEventos = await listarEventos();
        if (listaEventos.length === 0) {
            throw new Error("Nenhum produto encontrado!");
        }
        resp.status(200).json(listaEventos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/evento/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        let listaEventos = await listarUmEvento(id);
        if (listaEventos.length < 1) {
            throw new Error("Evento não encontrado!");
        }
        resp.status(200).json(listaEventos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.put('/evento/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const evento = req.body;
        const eventoAtualizado = await editarEvento(id, evento);

        resp.status(200).json(eventoAtualizado);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.delete('/evento/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        await deletarEvento(id);
        resp.status(200).json("evento excluido com sucesso!");
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

export default servidor;