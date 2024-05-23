import './index.scss';
import axios from "axios";
import React, { useEffect, useState } from 'react';

import { MdOutlineFileDownload } from "react-icons/md";
import { buscarDados } from '../../Service/api.service';

export default function ModalProduto({ info, handleClose, id, tipo }) {
    const [descricao, setDescricao] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [grupoEscolhido, setGrupoEscolhido] = useState("");
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
                nomeProduto: nomeProduto,
                descricaoProduto: descricao,
                valorProduto: precoProduto,
                pesoProduto: pesoProduto,
                grupoProduto: grupoEscolhido
            };
            const resp = await axios.post(`http://127.0.0.1:5000/produto/${id}`, body);
            if (resp.status === 200) {
                const formData = new FormData();
                formData.append('imgProduto', arquivoImagem);
                const uploadConfig = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                const uploadResponse = await axios.put(`http://127.0.0.1:5000/produto/imagem/${resp.data.id}`, formData, uploadConfig);
                if (uploadResponse.status !== 202) {
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
                    nomeProduto: nomeProduto,
                    descricaoProduto: descricao,
                    valorProduto: precoProduto,
                    pesoProduto: pesoProduto,
                    grupoProduto: grupoEscolhido
                };
                await axios.put(`http://127.0.0.1:5000/produto/${info.idProduto}`, body);
            }

            if (imagemAlterada > 0) {
                const formData = new FormData();
                formData.append('imgProduto', arquivoImagem);
                const uploadConfig = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                await axios.put(`http://127.0.0.1:5000/produto/imagem/${info.idProduto}`, formData, uploadConfig);
            }
            alert("Produto alterado com sucesso!")
            handleClose();
        } catch (error) {
            alert("Erro ao alterar produto" + error);
        }
    }

    useEffect(() => {
        console.log("esta em modalProduto");
        console.log("ModalProduto info= "+ info);
        console.log("ModalProduto id= ", id);
        if (tipo !== "salvar") {
            async function buscarProduto() {
                setNomeProduto(info.nomeProduto)
                setDescricao(info.descricaoProduto)
                setPesoProduto(info.pesoProduto)
                setPrecoProduto(info.valorProduto)
                setGrupoEscolhido(info.grupoProduto)
                const urlImagem = `http://127.0.0.1:5000/${info.imagem}`
                setImagem(urlImagem)
            }
            buscarProduto();
        }
        async function fetchData() {
            try {
                const infoGrupos = await buscarDados(`grupo/subcategoria/${idCardapio}`);
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
                    <label for="campoDeTexto1" className='input_label'>Nome Produto:</label>
                    <input id="campoDeTexto1" className="input_texto" value={nomeProduto} onChange={(e) => handleChangeTextArea(e, "nomeProduto")} />
                </div>
                <div className='camposInput'>
                    <label for="campoDeTexto2" className='input_label'>Preço:</label>
                    <input id="campoDeTexto2" className="input_texto" style={{ width: 120 }} value={precoProduto} onChange={(e) => handleChangeTextArea(e, "preco")} />
                </div>
                <div className='camposInput'>
                    <label for="campoDeTexto3" className='input_label'>Peso/Qtd:</label>
                    <input id="campoDeTexto3" className="input_texto" style={{ width: 120 }} value={pesoProduto} onChange={(e) => handleChangeTextArea(e, "peso")} />
                </div>

                <div className='select'>
                    <select id="select" class="select_grupo" onChange={(e) => handleChangeTextArea(e, "grupo")}>
                        <option value="" disabled selected hidden>{grupoEscolhido === "" ? "Selecionar Grupo" : grupoEscolhido}</option>
                        {grupos.map(grupo => (
                            <option key={grupo.idGrupo} value={grupo.idGrupo} >{grupo.nomeGrupo}</option>
                        ))}
                    </select>
                </div>

                <div className='text_area'>
                    <label htmlFor="campo_texto">Descrição:</label>
                    <textarea id="campo_texto" className="textarea-field" value={descricao} onChange={(e) => handleChangeTextArea(e, "descricao")} />
                </div>
                <div className='button_salvar' onClick={() => { tipo === "salvar" ? salvarProduto() : alterarProduto() }}><a>{tipo}</a></div>

            </div>
        </div>
    );

}