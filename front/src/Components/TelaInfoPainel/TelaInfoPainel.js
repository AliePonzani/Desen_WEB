import './index.scss';
import axios from 'axios';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ModalCardapio from '../ModalCardapio';
import ModalProduto from '../ModalProduto';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { buscarDados } from '../../Service/api.service';

const style = {
    position: 'absolute',
    top: '50%',
    left: "40%",
    transform: 'translate(-30%, -50%)'
};

export default function TelaInfoPainel(params) {
    const [produtos, setProdutos] = useState([]);
    const [cardapios, setCardapios] = useState({});
    const [componente, setComponente] = useState();
    const [id, setId] = useState();
    const [tipo, setTipo] = useState();

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => setOpenDialog(false);


    const categorias = { nomeSubcategorias: ["Eventos", "Fotos"], idSubcategorias: [0, 1] };

    let escolha = params.titulo === "Cardápio" ? cardapios : categorias;

    useEffect(() => {
        async function fetchData() {
            try {
                const infoProdutos = await buscarDados("produto");
                setProdutos(infoProdutos);

                const listaCardapios = await buscarDados("subcategorias/categoria/7");
                const cardapiosArray = {
                    nomeSubcategorias: [],
                    idSubcategorias: []
                };
                console.log(escolha);

                listaCardapios.forEach(cardapio => {
                    if (!cardapiosArray.idSubcategorias.includes(cardapio.idSubcategoria)) {
                        cardapiosArray.nomeSubcategorias.push(cardapio.nomeSubcategoria);
                        cardapiosArray.idSubcategorias.push(cardapio.idSubcategoria);
                    }
                });
                setCardapios(cardapiosArray);
            } catch (error) {
                console.error('Erro ao buscar os dados PAINEL:', error);
            }
        }
        fetchData();
    }, [open, openDialog])

    const deletar = async () => {
        try {
            const resp = await axios.delete(`http://127.0.0.1:5000/${tipo}/${id}`);
            if (resp.status === 200) {
                alert(`${tipo} deletado com sucesso!`);
            }
        } catch (error) {
            alert(`Erro ao deletar ${tipo}` + error);
        }
        handleCloseDialog();
    }

    const handleOpenDialog = (id, tipo) => {
        setId(id);
        setTipo(tipo);
        setOpenDialog(true);
    };

    const handleOpen = (info, componente, id, tipo) => {
        const teste = React.createElement(componente, { info: info, handleClose: handleClose, id: id, tipo: tipo });
        setComponente(teste);
        setOpen(true);
    };

    const renderizarProdutosPorSubcategoria = (nomeSubcategoria) => {
        const temProdutos = produtos.some(produto => produto.nomeSubcategoria === nomeSubcategoria);

        if (!produtos || !Array.isArray(produtos) || !temProdutos) {
            return (
                <div className='corpoTabela itens'>
                    <p>Não há nada cadastrado ainda!</p>
                </div>
            );
        } else {
            const produtosFiltrados = produtos.filter(produto => produto.nomeSubcategoria === nomeSubcategoria);
            return produtosFiltrados.map(produto => (
                <div className='corpoTabela itens' key={produto.idProduto}>
                    <p>{produto.nomeProduto}</p>
                    <p>{produto.nomeGrupo}</p>
                    <p>{produto.valorProduto}</p>
                    <div>
                        <button className='editar'
                            onClick={() => handleOpen(produto, ModalProduto, produto.idProduto, "editar")}
                        ><MdEdit /> Editar</button>
                        <button className='deletar' onClick={() => handleOpenDialog(produto.idProduto, "produto")}><MdDelete /> Deletar</button>
                    </div>
                </div>
            ));
        }
    };

    if (!escolha.nomeSubcategorias || !Array.isArray(escolha.nomeSubcategorias)) {
        return (
            <section className='telaInfoPainel'>
                <h1 className='titulo'>{params.titulo}</h1>
                <div className='tabelas'>
                    <h1>Nenhumaaaa tabela encontrada ou cadastrada</h1>
                </div>
            </section>
        );
    }

    return (
        <section className='telaInfoPainel'>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Realmente deseja excluir este item?"}
                </DialogTitle>
                <DialogActions>
                    <button onClick={() => deletar()}>Deletar</button>
                    <button onClick={handleCloseDialog} >Cancelar</button>
                </DialogActions>
            </Dialog>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {componente}
                </Box>
            </Modal>

            <div className='tabelas'>
                {escolha.nomeSubcategorias.map((nomeSubcategoria, index) =>
                    <div className='tabela' key={index}>
                        <div className='tituloTabela'>
                            <h1>{nomeSubcategoria}</h1>
                            <div className='botoesTituloTabela'>
                                <button className='deletar'
                                    style={{ visibility: params.titulo === "Cardápio" ? 'visible' : 'hidden' }}
                                    onClick={() => handleOpenDialog(escolha.idSubcategorias[index], "subcategoria")}
                                >
                                    <MdDelete />
                                    Deletar Cardápio
                                </button>
                                <button className='editar'
                                    style={{ visibility: params.titulo === "Cardápio" ? 'visible' : 'hidden' }}
                                    onClick={() => handleOpen(
                                        {
                                            nomeSubcategoria: nomeSubcategoria,
                                            idSubcategorias: escolha.idSubcategorias[index]
                                        },
                                        ModalCardapio,
                                        escolha.idSubcategorias[index],
                                        "editar"
                                    )}
                                >
                                    <MdEdit />
                                    Editar Cardápio
                                </button>
                                <button className='add' onClick={() => handleOpen(null, ModalProduto, escolha.idSubcategorias[index], "salvar")}><FaPlus /> Adicionar Produto</button>
                            </div>
                        </div>
                        <div className='cabecalhoTabela itens'>
                            <p>Título</p>
                            <p>Grupo</p>
                            <p>Preço</p>
                            <p>Ações</p>
                        </div>
                        {renderizarProdutosPorSubcategoria(nomeSubcategoria)}
                    </div>
                )}
            </div>
        </section>
    );
}
