import './index.scss';
import { AiFillHome } from "react-icons/ai";
import { MdOutlineMenuBook } from "react-icons/md";
import TelaInfoPainel from '../../Components/TelaInfoPainel/TelaInfoPainel.js';
import React, { useState } from 'react';

export default function Painel() {
    const [selectedItem, setSelectedItem] = useState("Painel de Controle");

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    return (
        <main className='telaPianel'>
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
            <TelaInfoPainel titulo={selectedItem} ></TelaInfoPainel>
        </main>
    )
}