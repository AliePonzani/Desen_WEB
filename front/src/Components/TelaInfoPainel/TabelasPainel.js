import './index.scss';
import React, { useEffect, useState } from "react";
import { buscarTodos, deletar } from "../../API/chamadas";
import { format } from "date-fns";
import ModalEvento from "../ModalEvento";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { Box, Dialog, DialogActions, DialogTitle, Modal } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: "40%",
    transform: 'translate(-30%, -50%)'
};

export default function Tabelaspainel() {
    const [eventos, setEventos] = useState([]);
    const [fotos, setFotos] = useState([]);
    const [componente, setComponente] = useState();
    const [id, setId] = useState();
    const [tipo, setTipo] = useState();

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => setOpenDialog(false);

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'HH:mm');
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const listaEventos = await buscarTodos("evento");
                setEventos(listaEventos);

                const listaFotos = await buscarTodos("imagem");
                setFotos(listaFotos);
            } catch (error) {
                console.error('Erro ao buscar os dados PAINEL:', error);
            }
        }
        fetchData();
    }, [open, openDialog]);

    const deletarItem = async () => {
        try {
            const resp = await deletar(tipo, id);
            if (resp.status === 200) {
                alert(`${tipo} deletado com sucesso!`);
            }
        } catch (error) {
            alert(`Erro ao deletar ${tipo}` + error);
        }
        handleCloseDialog();
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
                    <button onClick={() => deletarItem()}>Deletar</button>
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
                <div className='tabela'>
                    <div className='tituloTabela'>
                        <h1>Eventos</h1>
                        <div className='botoesTituloTabela'>
                            <button className='add' onClick={() => handleOpen(null, ModalEvento, eventos, "salvar")}><FaPlus /> Adicionar Evento</button>
                        </div>
                    </div>
                    <div className='cabecalhoTabela itens'>
                        <p>Título</p>
                        <p>Data</p>
                        <p>Hora</p>
                        <p>Ações</p>
                    </div>
                    <div className='linhasTabela'>
                        {eventos.length === 0 ? (
                            <div className='corpoTabela itens'>
                                <p>Não há nada cadastrado ainda!</p>
                            </div>
                        ) : (
                            <div>
                                {eventos.map((evento, index) =>
                                    <div className='corpoTabela itens' key={index}>
                                        <p>{evento.titulo}</p>
                                        <p>{formatDate(evento.dataInicio)} até {formatDate(evento.dataFim)}</p>
                                        <p>{formatTime(evento.dataInicio)} ás {formatTime(evento.dataFim)}</p>
                                        <div>
                                            <button className='editar'
                                                onClick={() => handleOpen(evento, ModalEvento, evento.id, "editar")}
                                            ><MdEdit /> Editar</button>
                                            <button className='deletar'  onClick={() => handleOpenDialog(evento.id, "evento")}><MdDelete /> Deletar</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className='tabela'>
                    <div className='tituloTabela'>
                        <h1>Fotos</h1>
                        <div className='botoesTituloTabela'>

                            <button className='add' onClick={() => handleOpen(null, ModalEvento, eventos, "salvar")}><FaPlus /> Adicionar Foto</button>
                        </div>
                    </div>
                    <div className='cabecalhoTabela itens'>
                        <p>Título</p>
                        <p>Carrossel</p>
                        <p>Ações</p>
                    </div>
                    <div className='linhasTabela'>
                        {fotos.length === 0 ? (
                            <div className='corpoTabela itens'>
                                <p>Não há nada cadastrado ainda!</p>
                            </div>
                        ) : (
                            <div>
                                {fotos.map((foto, index) =>
                                    <div className='corpoTabela itens' key={index}>
                                        <p>{foto.titulo}</p>
                                        <p>{foto.carrossel === 0 ? 'Principal' : 'Fotos Loja'}</p>
                                        <div>
                                            <button className='editar'
                                                onClick={() => handleOpen(foto, ModalEvento, foto.id, "editar")}
                                            ><MdEdit /> Editar</button>
                                            <button className='deletar' onClick={() => handleOpenDialog(foto.id, "evento")}><MdDelete /> Deletar</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}