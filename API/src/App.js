import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import cardapioController from "./controller/cardapioController.js";
import grupoController from "./controller/grupoController.js";
import produtoController from "../src/controller/produtoController.js"
import eventoController from "../src/controller/eventoController.js";
import imagemController from "../src/controller/imagemController.js";

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

//Controllers
servidor.use(cardapioController);
servidor.use(grupoController);
servidor.use(produtoController);
servidor.use(eventoController);
servidor.use(imagemController);

servidor.use('/storage/evento', express.static('storage/evento'));
servidor.use('/storage/produto', express.static('storage/produto'));
servidor.use('/storage/carrossel', express.static('storage/carrossel'));


// Tratamento de erro genérico
servidor.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
});

let port = process.env.PORT;
servidor.listen(port, () => console.log("API SUBIU!"));

export default servidor;
