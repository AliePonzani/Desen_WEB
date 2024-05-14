import './index.scss';
import axios from 'axios';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ModalCardapio from "../ModalCardapio";
import ModalAdicionar from '../ModalAdicionar';

const style = {
    position: 'absolute',
    top: '50%',
    left: "40%",
    transform: 'translate(-30%, -50%)'
};


export default function TelaInfoPainel(params) {
    console.log(params.vetor);
    const [componente, setComponente] = useState();
    const [open, setOpen] = useState(false);

    const handleOpen = (item) => {
        setComponente(item);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    async function deletarProduto(produto) {
        try {
            await axios.delete(`http://127.0.0.1:5000/produto/${produto}`);
            console.log("cardapio deletado");
        } catch (error) {
            console.log("erro ao deletar cardápio", error);
        }
    }

    async function deletarCardapio(cardapio) {
        try {
            await axios.delete(`http://127.0.0.1:5000/subcategoria/${cardapio}`);
            alert("cardápio deletado");
        } catch (error) {
            alert("erro ao deletar cardápio", error);
        }
    }

    const renderizarProdutosPorSubcategoria = (nomeSubcategoria) => {
        if (!params.produtos || !Array.isArray(params.produtos)) {
            return (
                <div className='corpoTabela itens'>
                    <p>Não há nada cadastrado ainda!</p>
                </div>
            );
        }

        const temProdutos = params.produtos.some(produto => produto.nomeSubcategoria === nomeSubcategoria);

        if (!temProdutos) {
            return (
                <div className='corpoTabela itens'>
                    <p>Não há nada cadastrado ainda!</p>
                </div>
            );
        } else {
            const produtosFiltrados = params.produtos.filter(produto => produto.nomeSubcategoria === nomeSubcategoria);
            return produtosFiltrados.map(produto => (
                <div className='corpoTabela itens' key={produto.idProduto}>
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
                    <p>{produto.nomeProduto}</p>
                    <p>{produto.nomeGrupo}</p>
                    <div>
                        <button className='editar' ><MdEdit /> Editar</button>
                        <button className='deletar' onClick={() => deletarProduto(produto.idProduto)}><MdDelete /> Deletar</button>
                    </div>
                </div>
            ));
        }
    };

    return (
        <section className='telaInfo'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {React.cloneElement(componente, { handleClose: handleClose })}
                </Box>
            </Modal>
            <h1 className='titulo'>{params.titulo}</h1>
            <button className='addCardapio add'
                style={{ visibility: params.titulo === "Cardápio" ? 'visible' : 'hidden' }}
                onClick={() => handleOpen(<ModalCardapio />)}
            >
                <FaPlus />
                Adicionar Cardápio
            </button>
            <div className='tabelas'>
                {params.vetor.nomeSubcategorias.map((nomeSubcategoria, index) =>
                    <div className='tabela' key={index}>
                        <div className='tituloTabela'>
                            <h1>{nomeSubcategoria}</h1>
                            <div className='botoesTituloTabela'>
                                <button className='deletar'
                                    style={{ visibility: params.titulo === "Cardápio" ? 'visible' : 'hidden' }}
                                    onClick={() => deletarCardapio(params.vetor.idSubcategorias[index])}
                                >
                                    <MdDelete />
                                    Deletar Cardápio
                                </button>
                                <button className='editar' style={{ visibility: params.titulo === "Cardápio" ? 'visible' : 'hidden' }}>
                                    <MdEdit />
                                    Editar Cardápio
                                </button>
                                <button className='add' onClick={() => handleOpen(<ModalAdicionar />)}><FaPlus /> Adicionar Produto</button>
                            </div>
                        </div>
                        <div className='cabecalhoTabela itens'>
                            <p>Título</p>
                            <p>Grupo</p>
                            <p>Ações</p>
                        </div>
                        {renderizarProdutosPorSubcategoria(nomeSubcategoria)}
                    </div>
                )}
            </div>
        </section>
    );
}
