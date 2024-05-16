import './index.scss';
import axios from "axios";
import React, { useState } from 'react';

export default function ModalCardapio({ handleClose }) {
    const [cardapio, setCardapio] = useState('');
    const [grupo, setGrupo] = useState('');
    const [tags, setTags] = useState([]);

    const handleChangeCardapioInput = (event) => {
        setCardapio(event.target.value);
    };

    const addGrupoAoCardapio = async (tags, idCardapio) => {
        try {
            for (const tag of tags) {
                const body = { nomeGrupo: tag };
                await axios.post(`http://127.0.0.1:5000/grupo/${idCardapio}`, body);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const salvarCardapio = async (cardapio) => {
        if (cardapio !== "" || tags !== null) {
            try {
                const body = { nomeSubcategoria: cardapio };
                const resp = await axios.post("http://127.0.0.1:5000/subcategoria/7", body);
                if (resp.status === 200) {
                    addGrupoAoCardapio(tags, resp.data.id);
                    alert('Cardápio ' + cardapio + " com os grupos " + tags);
                    handleClose();
                }
            } catch (error) {
                alert.error("Erro ao salvar o cardápio! ", error);
            }
        } else {
            alert("Todos os campos devem ser preenchidos e ao menos 1 grupo adicionado!")
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

    const handleRemoveTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    return (
        <div className='modal-cardapio'>
            <div className='input_section'>
                <label for="campoDeTexto">Nome Cardápio:</label>
                <input id="campoDeTexto" className="input_texto" value={cardapio} onChange={handleChangeCardapioInput} onKeyDown={(event) => {
                    // if (event.key === 'Enter') {
                    //     handleAddTag();
                    // }
                }} />
            </div>
            <div className='input_section'>
                <div className='grupos'>
                    <div className='selectTag'>
                        {tags.map((tag, index) => (
                            <div key={index} className='tag'>
                                <span className='tag_text'>{tag}</span>
                                <span className='tag_close' onClick={() => handleRemoveTag(index)}>&times;</span>
                            </div>
                        ))}
                        <input id="campoDeTexto" className="input_textoGrupo" placeholder='inserir aqui' value={grupo} onChange={handleChangeGrupoInput} onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleAddTag();
                            }
                        }} />
                    </div>
                    <a className='button_adcionar' onClick={handleAddTag}>+ Adicionar Grupo cardapio</a>
                </div>
            </div>
            <button className='button_salvar' onClick={() => { salvarCardapio(cardapio) }}>Salvar</button>
        </div>
    );

}