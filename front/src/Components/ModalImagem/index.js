/* eslint-disable react-hooks/exhaustive-deps */
import './index.scss';
import React, { useEffect, useState } from 'react';

import { MdOutlineFileDownload } from "react-icons/md";
import { alterar, alterarFoto, buscarImagem, salvar } from '../../API/chamadas';

export default function ModalImagem({ info, handleClose, tipo }) {

    const [imagem, setImagem] = useState(null);
    const [arquivoImagem, setArquivoImagem] = useState(null);
    const [imagemAlterada, setImagemAlterada] = useState(0);
    const [tituloFoto, setTituloFoto] = useState('');
    const [grupo, setGrupo] = useState('Fotos');
    const [camposAlterado, setCamposAlterado] = useState(0);


    const handleChangeGrupo = (grupo) => {
        setGrupo(grupo);
    }

    const handleChangeTexto = (event) => {
        setCamposAlterado(camposAlterado + 1);
        setTituloFoto(event.target.value);
    }

    const handleFileChange = (event) => {
        setImagemAlterada(imagemAlterada + 1);
        const file = event.target.files[0];
        if (file) {
            setArquivoImagem(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagem(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.log("Nenhum arquivo inserido!");
        }
    };

    const salvarImagem = async () => {
        if (!tituloFoto || !imagem) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }
        try {
            const body = {
                titulo: tituloFoto,
                carrossel: grupo === 'Fotos' ? 1 : 0
            }
            const resp = await salvar('imagem', body);
            if (resp.status === 200) {
                const uploadResponse = await alterarFoto('imagem', resp.data.id, arquivoImagem);
                if (uploadResponse !== 202) {
                    alert('Erro ao enviar a imagem');
                    return;
                } else {
                    alert('Imagem ' + tituloFoto + " adicionada com sucesso!");
                    handleClose();
                }
            }
        } catch (error) {
            console.log("Deu erro: ", error);
        }
    }

    const alterarImagem = async () => {
        if (!tituloFoto || !imagem) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }
        try {
            if (camposAlterado > 0) {
                const body = {
                    titulo: tituloFoto,
                    carrossel: grupo === 'Fotos' ? 1 : 0
                }
                await alterar('imagem', info.id, body);
            }
            if (imagemAlterada > 0) {
                await alterarFoto('imagem', info.id, arquivoImagem);
            }
            alert("Evento alterado com sucesso!");
            handleClose();
        } catch (error) {
            alert("Erro ao alterar imagem" + error);
        }
    }

    useEffect(() => {
        if (tipo !== "salvar") {
            console.log(info);
            setTituloFoto(info.titulo);
            setGrupo(info.carrossel === 1 ? "Fotos" : "Carrosel");
            const urlImagem = buscarImagem(info.imagem)
            setImagem(urlImagem);
        }
    }, [])

    return (
        <div className='modal-imagem'>
            <div className='area_arquivo'>
                <label className={`arquivo_campo styleGrupo-${grupo}`}>
                    <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                    {imagem === null ?
                        <MdOutlineFileDownload className='icon_arquivo' /> :
                        <img src={imagem} alt="Imagem Selecionada" className='icon_arquivo' />
                    }
                </label>
            </div>

            <div className='button_section'>
                <button className='button' onClick={() => handleChangeGrupo('Fotos')} style={{
                    color: grupo === "Fotos" ? '#FFFFFF' : '#FF9E87',
                    backgroundColor: grupo === "Fotos" ? '#FF9E87' : '#FFFFFF'
                }}>Fotos</button>
                <button className='button' onClick={() => handleChangeGrupo('Carrosel')} style={{
                    color: grupo === "Carrosel" ? '#FFFFFF' : '#FF9E87',
                    backgroundColor: grupo === "Carrosel" ? '#FF9E87' : '#FFFFFF'
                }}>Carrosel</button>
            </div>
            <div>
                <label htmlFor="campoDeTexto1" className='input_label'>Título Foto:</label>
                <input id="campoDeTexto1" className="input_texto" value={tituloFoto} onChange={(e) => handleChangeTexto(e)} />
            </div>
            <div className='button_salvar'>
                <button onClick={() => { tipo === "salvar" ? salvarImagem() : alterarImagem() }}>{tipo}</button>
            </div>
        </div>
    );

}