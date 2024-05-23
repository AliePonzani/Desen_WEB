
import { Router } from "express";
import { buscarGrupo, buscarGruposCardapio, deletarGrupo, listaGrupos, salvarGrupo } from "../repository/grupoRepository.js";
import { buscarCardapio } from "../repository/cardapioRepository.js";
import { buscarProdutosCardapio, deletarProduto } from "../repository/produtoRepository.js";
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
        const produtosDoCardapio = await buscarProdutosCardapio(id);
        if (produtosDoCardapio.length > 0) {
            for (const produto of produtosDoCardapio) {
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


// import { Router } from "express";
// import { buscarCardapio } from "../repository/cardapioRepository";
// import { salvarGrupo } from "../repository/grupoRepository";
// let servidor = Router();

// servidor.post('/grupo/:cardapio', async (req, resp) => {
//     try {
//         let grupo = req.body;
//         let cardapio = req.params.cardapio;
//         let lista = await buscarCardapio(cardapio);
//         if (lista.length < 1) {
//             throw new Error("Nenhuma subcategoria Encontrada!");
//         }
//         let grupoInserido = await salvarGrupo(categoria, grupo);
//         resp.status(200).json(grupoInserido);
//     } catch (error) {
//         resp.status(500).json({ error: error.message });
//     }
// });

// export default servidor;

// servidor.get('/grupo', async (req, resp) => {
//     try {
//         let grupos = await listaGrupos();
//         resp.status(200).json(grupos);
//     } catch (error) {
//         resp.status(500).json({ message: 'Erro ao listar grupos', error: error.message });
//     }
// });

// servidor.get('/grupo/:id', async (req, resp) => {
//     try {
//         let grupo = req.params.id;
//         let exibirGrupo = await listarGrupo(grupo);
//         resp.status(200).json(exibirGrupo);
//     } catch (error) {
//         resp.status(500).json({ message: 'Erro ao buscar grupo', error: error.message });
//     }
// });

// servidor.get('/grupo/subcategoria/:id', async (req, resp) => {
//     try {
//         let subcategoria = req.params.id;
//         let grupos = await listarGruposSubcategoria(subcategoria);
//         if (grupos.length < 1) {
//             throw new Error("Nenhum grupo Encontrado!");
//         }
//         resp.status(200).json(grupos);
//     } catch (error) {
//         resp.status(404).json({ error: error.message });
//     }
// });

// servidor.put('/grupo/:subcategoria/:id', async (req, resp) => {
//     try {
//         const id = req.params.id;
//         const subcategoria = req.params.subcategoria;
//         const grupo = req.body;

//         const grupoAtualizado = await editarGrupo(subcategoria, id, grupo);

//         resp.status(200).json(grupoAtualizado);
//     } catch (error) {
//         resp.status(500).json({ error: error.message });
//     }
// });

// servidor.delete('/grupo/:id', async (req, resp) => {
//     try {
//         const id = req.params.id;
//         const produtosGrupo = await listarProdutoGrupo(id);
//         if (produtosGrupo.length > 0) {
//             for (const produto of produtosGrupo) {
//                 await deletarProduto(produto.idProduto, produto);
//             }
//         }
//         await deletarGrupo(id);
//         resp.status(200).json("grupo excluido com sucesso!");
//     } catch (error) {
//         resp.status(500).json({ error: error.message });
//     }
// });


