import './index.scss';
import React, { useEffect, useState } from 'react';

import { MdOutlineFileDownload } from "react-icons/md";
import { salvar, alterarFoto } from '../../API/Chamadas/chamadasProduto';

export default function ModalEvento({ info, handleClose, tipo }) {
    const [imagem, setImagem] = useState(null);
    const [arquivoImagem, setArquivoImagem] = useState(null);
    const [imagemAlterada, setImagemAlterada] = useState(0);
    const [tituloEvento, setTituloEvento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [date1, setDate1] = useState('');
    const [time1, setTime1] = useState('');
    const [date2, setDate2] = useState('');
    const [time2, setTime2] = useState('');
    const [precoEvento, setPrecoEvento] = useState('');
    const [camposAlterado, setCamposAlterado] = useState(0);

    const handleChangeTextArea = (event, campo) => {
        setCamposAlterado(camposAlterado + 1);
        const valor = event.target.value;
        if (campo === "tituloEvento") {
            setTituloEvento(valor);
        } else if (campo === "descricao") {
            setDescricao(valor);
        } else if (campo === "date1") {
            setDate1(valor);
        } else if (campo === "date2") {
            setDate2(valor);
        } else if (campo === "time1") {
            setTime1(valor);
        } else if (campo === "time2") {
            setTime2(valor);
        } else if (campo === "precoEvento") {
            setPrecoEvento(valor);
        }
    };

    const converterDataeHora = (data) => {
        
    }

    const combineDateTime = (date, time) => {
        if (date && time) {
            return `${date} ${time}:00`; // Adiciona segundos "00" para completar o formato 'YYYY-MM-DD HH:MM:SS'
        }
        return null;
    };

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

    const salvarEvento = async () => {
        if (!tituloEvento || !descricao || !date1 || !date2 || !time1 || !time2 || !imagem) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }
        try {
            const body = {
                titulo: tituloEvento,
                dataInicio: combineDateTime(date1, time1),
                dataFim: combineDateTime(date2, time2),
                valor: precoEvento,
                descricao: descricao,
            }
            const resp = await salvar('evento', body);
            if (resp.status === 200) {
                const uploadResponse = await alterarFoto('evento', resp.data.id, arquivoImagem);
                console.log(uploadResponse);
                if (uploadResponse !== 202) {
                    alert('Erro ao enviar a imagem');
                    return;
                }else{
                    alert('Evento ' + tituloEvento + " adicionado com sucesso!");
                    handleClose();
                }
            }

        } catch (error) {
            console.log("Deu erro: ", error);
        }
    }

    const alterarEvento = () => { }

    useEffect(() => {
        if (tipo !== "salvar") {
            console.log(info);
            setTituloEvento(info.titulo)
            
        }
    }, [])

    return (
        <div className='modal-evento'>

            <div className='area_arquivo'>
                <label className='arquivo_campo'>
                    <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                    {imagem === null ?
                        <MdOutlineFileDownload className='icon_arquivo' /> :
                        <img src={imagem} alt="Imagem Selecionada" className='imagem-arquivo' />
                    }
                </label>
            </div>

            <div className='input_section'>
                <div>
                    <label htmlFor="campoDeTexto1" className='input_label'>Título do Evento:</label>
                    <input id="campoDeTexto1" className="input_texto" value={tituloEvento} onChange={(e) => handleChangeTextArea(e, "tituloEvento")} />
                </div>
                <div>
                    <label htmlFor="date1" className='input_label'>Dia:</label>
                    <input id="date1" className="input_date" type='date' value={date1} onChange={(e) => handleChangeTextArea(e, "date1")} />
                    <label htmlFor="date2" className='input_label'> até Dia:</label>
                    <input id="date2" className="input_date" type='date' value={date2} onChange={(e) => handleChangeTextArea(e, "date2")} />
                </div>

                <div>
                    <label htmlFor="time1" className='input_label'>Hora Início:</label>
                    <input id="time1" className="input_date" type='time' value={time1} onChange={(e) => handleChangeTextArea(e, "time1")} />
                    <label htmlFor="time2" className='input_label'>Hora Fim:</label>
                    <input id="time2" className="input_date" type='time' value={time2} onChange={(e) => handleChangeTextArea(e, "time2")} />
                </div>

                <div>
                    <label htmlFor="campoDeTexto2" className='input_label'>Valor:</label>
                    <input
                        id="campoDeTexto2"
                        className="input_texto"
                        type='number'
                        value={precoEvento}
                        onChange={(e) => handleChangeTextArea(e, "precoEvento")}
                    />
                </div>


                <div className='text_area'>
                    <label htmlFor="campo_texto">Descrição:</label>
                    <textarea id="campo_texto" className="textarea-field" value={descricao} onChange={(e) => handleChangeTextArea(e, "descricao")} />
                </div>
                <div className='button_salvar'>
                    <button onClick={() => { tipo === "salvar" ? salvarEvento() : alterarEvento() }}>{tipo}</button>
                </div>
                {/* <div className='button_salvar'><a>Salvar</a></div> */}

            </div>
        </div>
    );

}