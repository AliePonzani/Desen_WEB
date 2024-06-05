/* eslint-disable react-hooks/exhaustive-deps */
import './index.scss';
import React, { useEffect, useState } from 'react';

import { MdOutlineFileDownload } from "react-icons/md";
import { alterar, alterarFoto, buscarImagem, buscarPorCardapio, salvar } from '../../API/chamadas';

export default function ModalProduto({ info, handleClose, id, tipo }) {
    const [descricao, setDescricao] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [grupoEscolhido, setGrupoEscolhido] = useState({});
    const [precoProduto, setPrecoProduto] = useState('');
    const [pesoProduto, setPesoProduto] = useState('');
    const [arquivoImagem, setArquivoImagem] = useState(null);
    const [imagem, setImagem] = useState(null);
    const [grupos, setGrupos] = useState([]);
    const [camposAlterado, setCamposAlterado] = useState(0);
    const [imagemAlterada, setImagemAlterada] = useState(0);
    const idCardapio = id;

    const handleChangeTextArea = (event, campo) => {

        setCamposAlterado(camposAlterado + 1);
        const valor = event.target.value;
        if (campo === "descricao") {
            setDescricao(valor);
        } else if (campo === "nomeProduto") {
            setNomeProduto(valor);
        } else if (campo === "grupo") {
            console.log(valor);
            setGrupoEscolhido(valor);
        } else if (campo === "peso") {
            setPesoProduto(valor);
        } else if (campo === "preco") {
            setPrecoProduto(valor);
        }
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

    const salvarProduto = async () => {
        if (!nomeProduto || !descricao || !grupoEscolhido || !imagem) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }

        try {
            const body = {
                nome: nomeProduto,
                descricao: descricao,
                valor: precoProduto,
                peso: pesoProduto
            };
            const resp = await salvar(`produto/${grupoEscolhido.id}/${idCardapio}`, body);
            if (resp.status === 200) {
                const uploadResponse = await alterarFoto('produto', resp.data.id, arquivoImagem);
                if (uploadResponse !== 202) {
                    alert('Erro ao enviar a imagem');
                    return;
                }
                alert('Produto ' + nomeProduto + " adicionado com sucesso!");
                handleClose();
            }
        } catch (error) {
            alert("Erro ao salvar o cardápio! " + error);
        }
    }

    const alterarProduto = async () => {
        if (!nomeProduto || !descricao || !grupoEscolhido || !imagem) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }
        try {
            if (camposAlterado > 0) {
                const body = {
                    nome: nomeProduto,
                    descricao: descricao,
                    valor: precoProduto,
                    peso: pesoProduto,
                    grupo: grupoEscolhido.id
                };
                console.log(body);
                await alterar(`produto/${idCardapio}`, info.id, body);
            }

            if (imagemAlterada > 0) {
                await alterarFoto('produto', info.id, arquivoImagem);
            }

            alert("Produto alterado com sucesso!")
            handleClose();
        } catch (error) {
            alert("Erro ao alterar produto" + error);
        }
    }

    useEffect(() => {
        console.log(grupoEscolhido);
        if (tipo !== "salvar") {
            async function buscarProduto() {
                setNomeProduto(info.nome)
                setDescricao(info.descricao)
                setPesoProduto(info.peso)
                setPrecoProduto(info.valor)
                setGrupoEscolhido({nome: info.nome_grupo, id: info.idGrupo})
                const urlImagem = buscarImagem(info.imagem)
                setImagem(urlImagem)
            }
            buscarProduto();
        }
        async function fetchData() {
            try {
                const infoGrupos = await buscarPorCardapio('grupo', idCardapio);
                setGrupos(infoGrupos);

            } catch (error) {
                console.error('Erro ao buscar os dados PAINEL:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className='modal-adicionar'>
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
                <div className='camposInput'>
                    <label htmlFor="campoDeTexto1" className='input_label'>Nome Produto:</label>
                    <input id="campoDeTexto1" className="input_texto" value={nomeProduto} onChange={(e) => handleChangeTextArea(e, "nomeProduto")} />
                </div>
                <div className='camposInput'>
                    <label htmlFor="campoDeTexto2" className='input_label'>Preço:</label>
                    <input id="campoDeTexto2" type='number' className="input_texto" style={{ width: 120 }} value={precoProduto} onChange={(e) => handleChangeTextArea(e, "preco")} />
                </div>
                <div className='camposInput'>
                    <label htmlFor="campoDeTexto3" className='input_label'>Peso/Qtd:</label>
                    <input id="campoDeTexto3" className="input_texto" style={{ width: 120 }} value={pesoProduto} onChange={(e) => handleChangeTextArea(e, "peso")} />
                </div>

                <div className='select'>
                    <select id="select" className="select_grupo" onChange={(e) => handleChangeTextArea(e, "grupo")}>
                        <option value="" disabled selected hidden>{Object.keys(grupoEscolhido).length === 0 ? "Selecionar Grupo" : grupoEscolhido.nome}</option>
                        {grupos.map(grupo => (
                            <option key={grupo.id} value={grupo.id} >{grupo.nome}</option>
                        ))}
                    </select>
                </div>

                <div className='text_area'>
                    <label htmlFor="campo_texto">Descrição:</label>
                    <textarea id="campo_texto" className="textarea-field" value={descricao} onChange={(e) => handleChangeTextArea(e, "descricao")} />
                </div>
                <div className='button_salvar'>
                    <button onClick={() => { tipo === "salvar" ? salvarProduto() : alterarProduto() }}>{tipo}</button>
                </div>
            </div>
        </div>
    );

}