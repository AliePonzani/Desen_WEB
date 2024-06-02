import './index.scss';
import React, { useEffect, useState } from 'react';
import { alterar, buscarPorCardapio, deletar, salvar } from '../../API/Chamadas/chamadasProduto';

export default function ModalCardapio({ info, handleClose, id, tipo }) {
    const [cardapio, setCardapio] = useState(id);
    const [infoGrupos, setInfoGrupos] = useState(info);
    const [grupo, setGrupo] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (tipo !== "salvar") {
            async function buscarCardapio() {
                try {
                    setCardapio(info.nome);
                    const resp = await buscarPorCardapio('grupo', info.id);
                    setInfoGrupos(resp);
                    const gruposArray = []
                    resp.forEach(element => {
                        gruposArray.push(element.nome);
                    });
                    setTags(gruposArray);

                } catch (error) {
                    console.log(error);
                }
            }
            buscarCardapio();
        }

    }, [])

    const handleChangeCardapioInput = (event) => {
        setCardapio(event.target.value);
    };

    const salvarCardapio = async (cardapio) => {
        if (cardapio !== null || tags !== null) {
            try {
                const body = { nome: cardapio };
                const resp = await salvar('cardapio', body);
                if (resp.status === 200) {
                    tags.forEach(async tag => {
                        const respGrupo = await addGrupoAoCardapio(tag, resp.data.id);
                        console.log(respGrupo.status);
                    });
                    handleClose();
                    alert(`O cardápio: ${cardapio} foi salvo com os grupos: ${tags} pertencendo a ele!`)
                }
            } catch (error) {
                alert.error("Erro ao salvar o cardápio! ", error);
            }
        } else {
            alert("Todos os campos devem ser preenchidos e ao menos 1 grupo adicionado!")
        }
    }

    const addGrupoAoCardapio = async (tag, idCardapio) => {
        try {
            const body = { nome: tag };
            const resp = await salvar(`grupo/${idCardapio}`, body);
            console.log("a resposta de addGrupoAoCardapio é ", resp);
            return resp;
        } catch (error) {
            console.log(error);
        }
    }

    const alterarCardapio = async (cardapio) => {
        console.log("o id do cardapio a ser alterado é o " + id);
        console.log("com as tags ", infoGrupos);
        if (cardapio !== "" || tags !== null) {
            try {
                const body = { nome: cardapio };
                await alterar('cardapio', id, body);

                // Identificar os grupos existentes
                const gruposExistentes = infoGrupos.map(grupo => grupo.nome);

                // Filtrar os novos grupos
                const novosGrupos = tags.filter(tag => !gruposExistentes.includes(tag));

                // Adicionar novos grupos
                novosGrupos.forEach(async tag => {
                    await addGrupoAoCardapio(tag, id);
                    // console.log(respGrupo.status);
                });

                handleClose();
                alert(`O cardápio: ${cardapio} foi alterado com os grupos: ${tags} pertencendo a ele!`);
            } catch (error) {
                console.log("Erro ao salvar o cardápio! ", error);
            }
        } else {
            alert("Todos os campos devem ser preenchidos e ao menos 1 grupo adicionado!");
        }
    }


    const excluirGrupo = async (idGrupo) => {
        try {
            //inserir menssagem de confirmação
            await deletar('grupo', idGrupo);
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeGrupoInput = (event) => {
        setGrupo(event.target.value);
    };

    const handleAddTag = () => {
        if (grupo.trim() !== '') {
            setTags([...tags, grupo.trim()]);
            setGrupo('');
        }
    };

    const handleRemoveTag = (index, nomeGrupo) => {
        if (tipo !== "salvar") {
            console.log("era pra ter em inforgrupos -> ", infoGrupos);
            infoGrupos.forEach(grupo => {
                if (grupo.nome === nomeGrupo) {
                    excluirGrupo(grupo.id);
                }
            });
        }
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    return (
        <div className='modal-cardapio'>
            <div className='input_section'>
                <label for="campoDeTexto">Nome Cardápio:</label>
                <input id="campoDeTexto" className="input_texto" value={cardapio} onChange={handleChangeCardapioInput} onKeyDown={(event) => {

                }} />
            </div>
            <div className='input_section'>
                <div className='grupos'>
                    <div className='selectTag'>
                        {tags.map((tag, index) => (
                            <div key={index} className='tag'>
                                <span className='tag_text'>{tag}</span>
                                <span className='tag_close' onClick={() => handleRemoveTag(index, tag)}>&times;</span>
                            </div>
                        ))}
                        <input id="campoDeTexto" className="input_textoGrupo" placeholder='inserir aqui' value={grupo} onChange={handleChangeGrupoInput} onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleAddTag();
                            }
                        }} />
                    </div>
                    <button className='button_adcionar' onClick={handleAddTag}>+ Adicionar Grupo cardapio</button>
                </div>
            </div>
            <button className='button_salvar' onClick={() => { tipo === "salvar" ? salvarCardapio(cardapio) : alterarCardapio(cardapio) }}>Salvar</button>
        </div>
    );

}