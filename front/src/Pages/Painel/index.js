import './index.scss';
import React, { useState } from 'react';
import { AiFillHome } from "react-icons/ai";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import ModalCardapio from '../../Components/ModalCardapio/index.js';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TabelasCardapio from '../../Components/TelaInfoPainel/TabelasCardapio.js';
import Tabelaspainel from '../../Components/TelaInfoPainel/TabelasPainel.js';

const style = {
    position: 'absolute',
    top: '50%',
    left: "40%",
    transform: 'translate(-30%, -50%)'
};

export default function Painel() {
    const [selectedItem, setSelectedItem] = useState("Painel de Controle");
    const [componente, setComponente] = useState();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleOpen = (info, componente, id, tipo) => {
        const teste = React.createElement(componente, { info: info, handleClose: handleClose, id: id, tipo: tipo });
        setComponente(teste);
        setOpen(true);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    return (
        <main className='telaPainel'>
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
            <section className='toolBar'>
                <div className='logo'>
                    <img src={'/assets/img/logo circular.png'} alt="Logo da loja" width="145" height="145" />
                </div>
                <div className='botoesNav'>
                    <nav onClick={() => handleSelectItem("Painel de Controle")} className='testePainel' style={{ color: selectedItem === "Painel de Controle" ? '#a97f2c' : '#9a9a9a' }}>
                        <div style={{ visibility: selectedItem === "Painel de Controle" ? 'visible' : 'hidden' }}></div>
                        <AiFillHome ></AiFillHome>
                        <p >Painel</p>
                    </nav>
                    <nav onClick={() => handleSelectItem("Cardápio")} className='testePainel' style={{ color: selectedItem === "Cardápio" ? '#a97f2c' : '#9a9a9a' }}>
                        <div style={{ visibility: selectedItem === "Cardápio" ? 'visible' : 'hidden' }}></div>
                        <MdOutlineMenuBook ></MdOutlineMenuBook>
                        <p>Cardápio</p>
                    </nav>
                </div>
            </section>

            <section className='telaInfo'>

                <h1 className='titulo'>{selectedItem}</h1>
                <button className='addCardapio add'
                    style={{ visibility: selectedItem === "Cardápio" ? 'visible' : 'hidden' }}
                    onClick={() => handleOpen(null, ModalCardapio, null, "salvar")}
                >
                    <FaPlus />
                    Adicionar Cardápio
                </button>
                {selectedItem === "Cardápio" && <TabelasCardapio/>}
                {selectedItem === "Painel de Controle" && <Tabelaspainel/>}
            </section>
        </main>
    )
}