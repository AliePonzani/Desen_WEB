import multer from "multer";
import { Router } from "express";
import { buscarImagemCarrossel, deletarImagem, editarImagem, listarImagens, salvarImagem } from "../repository/imagemRepository.js";
import { alterarImagem } from "../repository/produtoRepository.js";

const upload = multer({ dest: 'storage/carrossel' });
let servidor = Router();

servidor.post('/imagem', async (req, resp) => {
    try {
        let imagem = req.body;
        await salvarImagem(imagem);
        resp.status(200).json(imagem);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/imagem', async (req, resp) => {
    try {
        let eventos = await listarImagens();
        resp.status(200).json(eventos);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.get('/imagem/:carrossel', async (req, resp) => {
    try {
        let carrossel = req.params.carrossel;
        let imagens = await buscarImagemCarrossel( carrossel);
        if (imagens.length < 1) {
            throw new Error("Nenhuma imagem encontrada!");
        }
        resp.status(200).json(imagens);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.put('/imagem/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const imagem = req.body;
        await editarImagem(id, imagem);
        resp.status(200).json(imagem);
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
});

servidor.put('/imgCarrossel/:link/:id', upload.single('imgCarrossel'), async (req, resp) => {
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

servidor.delete("/imagem/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        await deletarImagem(id);
        resp.status(200).json("Imagem deletada com sucesso!");
    } catch (error) {
        resp.status(500).json({ error: error.message });
    }
})

export default servidor;