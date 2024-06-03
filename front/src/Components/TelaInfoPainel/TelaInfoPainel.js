// import './index.scss';
// import axios from 'axios';
// import { MdEdit, MdDelete } from "react-icons/md";
// import { FaPlus } from "react-icons/fa6";
// import React, { useEffect, useState } from 'react';
// import { format } from 'date-fns';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import ModalCardapio from '../ModalCardapio';
// import ModalProduto from '../ModalProduto';
// import ModalEvento from "../ModalEvento";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';
// import { buscarPorCardapio, buscarTodos } from '../../API/Chamadas/chamadasProduto';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: "40%",
//     transform: 'translate(-30%, -50%)'
// };

// export default function TelaInfoPainel(params) {
//     const [eventos, setEventos] = useState([]);
//     const [fotos, setFotos] = useState([]);
//     const [cardapios, setCardapios] = useState([]);
//     const [produtosPorCardapio, setProdutosPorCardapio] = useState({});
//     const [componente, setComponente] = useState();
//     const [id, setId] = useState();
//     const [tipo, setTipo] = useState();

//     const [open, setOpen] = useState(false);
//     const handleClose = () => setOpen(false);

//     const [openDialog, setOpenDialog] = useState(false);
//     const handleCloseDialog = () => setOpenDialog(false);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const listaCardapios = await buscarTodos("cardapio");
//                 setCardapios(listaCardapios);
//                 listaCardapios.forEach(async (cardapio) => {
//                     const produtos = await buscarPorCardapio('produto', cardapio.id);
//                     setProdutosPorCardapio(prevState => ({
//                         ...prevState,
//                         [cardapio.id]: produtos
//                     }));
//                 });

//                 const listaEventos = await buscarTodos("evento");
//                 setEventos(listaEventos);

//                 const listaFotos = await buscarTodos("imagem");
//                 setFotos(listaFotos);
//             } catch (error) {
//                 console.error('Erro ao buscar os dados PAINEL:', error);
//             }
//         }
//         fetchData();
//     }, [open, openDialog]);

//     const deletar = async () => {
//         try {
//             const resp = await axios.delete(`http://127.0.0.1:5000/${tipo}/${id}`);
//             if (resp.status === 200) {
//                 alert(`${tipo} deletado com sucesso!`);
//             }
//         } catch (error) {
//             alert(`Erro ao deletar ${tipo}` + error);
//         }
//         handleCloseDialog();
//     }

//     const handleOpenDialog = (id, tipo) => {
//         setId(id);
//         setTipo(tipo);
//         setOpenDialog(true);
//     };

//     const handleOpen = (info, componente, id, tipo) => {
//         const teste = React.createElement(componente, { info: info, handleClose: handleClose, id: id, tipo: tipo });
//         setComponente(teste);
//         setOpen(true);
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return format(date, 'dd/MM/yyyy');
//     };

//     const formatTime = (dateString) => {
//         const date = new Date(dateString);
//         return format(date, 'HH:mm');
//     };

//     if (params.titulo === "Cardápio") {
//         return (
//             <section className='telaInfoPainel'>
//                 <Dialog
//                     open={openDialog}
//                     onClose={handleCloseDialog}
//                     aria-labelledby="alert-dialog-title"
//                     aria-describedby="alert-dialog-description"
//                 >
//                     <DialogTitle id="alert-dialog-title">
//                         {"Realmente deseja excluir este item?"}
//                     </DialogTitle>
//                     <DialogActions>
//                         <button onClick={() => deletar()}>Deletar</button>
//                         <button onClick={handleCloseDialog} >Cancelar</button>
//                     </DialogActions>
//                 </Dialog>
//                 <Modal
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="modal-modal-title"
//                     aria-describedby="modal-modal-description"
//                 >
//                     <Box sx={style}>
//                         {componente}
//                     </Box>
//                 </Modal>

//                 <div className='tabelas'>
//                     {cardapios.map((cardapio, index) =>
//                         <div className='tabela' key={index}>
//                             <div className='tituloTabela'>
//                                 <h1>{cardapio.nome}</h1>
//                                 <div className='botoesTituloTabela'>
//                                     <button className='deletar'
//                                         onClick={() => handleOpenDialog(cardapio.id, "cardapio")}
//                                     >
//                                         <MdDelete />
//                                         Deletar Cardápio
//                                     </button>
//                                     <button className='editar'
//                                         onClick={() => handleOpen(
//                                             cardapio,
//                                             ModalCardapio,
//                                             cardapio.id,
//                                             "editar"
//                                         )}
//                                     >
//                                         <MdEdit />
//                                         Editar Cardápio
//                                     </button>
//                                     <button className='add' onClick={() => handleOpen(null, ModalProduto, cardapio.id, "salvar")}><FaPlus /> Adicionar Produto</button>
//                                 </div>
//                             </div>
//                             <div className='cabecalhoTabela itens'>
//                                 <p>Título</p>
//                                 <p>Grupo</p>
//                                 <p>Preço</p>
//                                 <p>Ações</p>
//                             </div>
//                             <div className='linhasTabela'>
//                                 {produtosPorCardapio[cardapio.id]?.length === 0 ? (
//                                     <div className='corpoTabela itens'>
//                                         <p>Não há nada cadastrado ainda!</p>
//                                     </div>
//                                 ) : (
//                                     produtosPorCardapio[cardapio.id]?.map((produto, index) =>
//                                         <div className='corpoTabela itens' key={index}>
//                                             <p>{produto.nome}</p>
//                                             <p>{produto.nome_grupo}</p>
//                                             <p>{produto.valor}</p>
//                                             <div>
//                                                 <button className='editar'
//                                                     onClick={() => handleOpen(produto, ModalProduto, produto.id, "editar")}
//                                                 ><MdEdit /> Editar</button>
//                                                 <button className='deletar' onClick={() => handleOpenDialog(produto.id, "produto")}><MdDelete /> Deletar</button>
//                                             </div>
//                                         </div>
//                                     )
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </section>
//         );
//     } else {
//         return (
//             <section className='telaInfoPainel'>
//                 <div className='tabelas'>
//                     <div className='tabela'>
//                         <div className='tituloTabela'>
//                             <h1>Eventos</h1>
//                             <div className='botoesTituloTabela'>

//                                 <button className='add' onClick={() => handleOpen(null, ModalEvento, eventos, "salvar")}><FaPlus /> Adicionar Evento</button>
//                             </div>
//                         </div>
//                         <div className='cabecalhoTabela itens'>
//                             <p>Título</p>
//                             <p>Data</p>
//                             <p>Hora</p>
//                             <p>Ações</p>
//                         </div>
//                         <div className='linhasTabela'>
//                             {eventos.length === 0 ? (
//                                 <div className='corpoTabela itens'>
//                                     <p>Não há nada cadastrado ainda!</p>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     {eventos.map((evento, index) =>
//                                         <div className='corpoTabela itens' key={index}>
//                                             <p>{evento.titulo}</p>
//                                             <p>{formatDate(evento.dataInicio)}</p>
//                                             <p>{formatTime(evento.dataInicio)} ás {formatTime(evento.dataFim)}</p>
//                                             <div>
//                                                 <button className='editar'
//                                                     onClick={() => handleOpen(evento, ModalEvento, evento.id, "editar")}
//                                                 ><MdEdit /> Editar</button>
//                                                 <button className='deletar' onClick={() => handleOpenDialog(evento.id, "evento")}><MdDelete /> Deletar</button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                     <div className='tabela'>
//                         <div className='tituloTabela'>
//                             <h1>Fotos</h1>
//                             <div className='botoesTituloTabela'>

//                                 <button className='add' onClick={() => handleOpen(null, ModalEvento, eventos, "salvar")}><FaPlus /> Adicionar Foto</button>
//                             </div>
//                         </div>
//                         <div className='cabecalhoTabela itens'>
//                             <p>Título</p>
//                             <p>Carrossel</p>
//                             <p>Ações</p>
//                         </div>
//                         <div className='linhasTabela'>
//                             {fotos.length === 0 ? (
//                                 <div className='corpoTabela itens'>
//                                     <p>Não há nada cadastrado ainda!</p>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     {fotos.map((foto, index) =>
//                                         <div className='corpoTabela itens' key={index}>
//                                             <p>{foto.titulo}</p>
//                                             <p>{foto.carrossel === 0 ? 'Principal' : 'Fotos Loja'}</p>
//                                             <div>
//                                                 <button className='editar'
//                                                     onClick={() => handleOpen(foto, ModalEvento, foto.id, "editar")}
//                                                 ><MdEdit /> Editar</button>
//                                                 <button className='deletar' onClick={() => handleOpenDialog(foto.id, "evento")}><MdDelete /> Deletar</button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         );
//     }
// }
