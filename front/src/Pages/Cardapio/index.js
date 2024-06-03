/* eslint-disable react-hooks/exhaustive-deps */
import './index.scss';

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { buscarImagem, buscarPorCardapio, buscarTodos } from '../../API/chamadas';


export default function Cardapio() {
    const { cardapio } = useParams();
    const [selectedItem, setSelectedItem] = useState();
    const [cardapios, setCardapios] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [produtosPorGrupo, setProdutosPorGrupo] = useState({});


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleSelectItem = (item) => {
        setAnchorEl(null);
        setSelectedItem(item);
        const cardapioEncontrado = cardapios.find(cardapio => cardapio.nome === item);
        if (cardapioEncontrado) {
            const resp = buscarGruposDoCardapio(cardapioEncontrado.id);
            console.log(resp);
        }
    };

    const buscarGruposDoCardapio = async (idCardapio) => {
        let grupos = await buscarPorCardapio('grupo', idCardapio);
        setGrupos(grupos);

        const promisesProdutos = grupos && grupos.length > 0 ? grupos.map(grupo => buscarProdutosDoGrupo(grupo.id)) : [];

        const produtosPorGrupo = await Promise.all(promisesProdutos);

        setProdutosPorGrupo(produtosPorGrupo);
    }

    const buscarProdutosDoGrupo = async (idGrupo) => {
        let produtos = await buscarTodos(`produto/grupo/${idGrupo}`)
        return produtos;
    }

    useEffect(() => {
        handleSelectItem(cardapio);
        async function fetchData() {
            try {
                let cardapios = await buscarTodos("cardapio");
                if (cardapios.length > 0) {
                    setCardapios(cardapios);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        }
        fetchData();
    }, [cardapio]);

    useEffect(() => {
        if (cardapios.length > 0) {
            handleSelectItem(cardapio);
        }
    }, [cardapios])

    return (
        <div className="bodyPrincipal">
            <header>
                <div className='menu'>
                    <Link to="/">Home</Link>
                    
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Cardápios
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleSelectItem}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {cardapios && cardapios.map((item, index) => (
                            <MenuItem key={index} onClick={() => handleSelectItem(item.nome)}>
                                {item.nome}
                            </MenuItem>
                        ))}
                    </Menu>

                    <a href="https://wa.me/+5511958655550">Contato</a>
                </div>
                <div className='logo'><img src='/assets/img/logo circular.png' alt='logo circular ArtGula'></img></div>
            </header>
            <div className="bodyCardapio">

                <div className="moldurasuperior">
                    <img className="moldura molduraesquerda" src='/assets/img/moldura.png' alt='moldura esquerda topo'></img>
                    <h1>Menu {selectedItem}</h1>
                    <img className="moldura molduradireita" src='/assets/img/moldura.png' alt='moldura direira topo'></img>
                </div>

                <div className="container">
                    {grupos && grupos.map((grupo, index) => (
                        <div key={index}>
                            <div className="cabecalho-Grupo">
                                <h1>{grupo.nome}</h1>
                                <p>*Consulte disponibilidade</p>
                            </div>
                            <div className="imagens">
                                {produtosPorGrupo[index] && produtosPorGrupo[index].length > 0 ? (
                                    produtosPorGrupo[index].map((imagem, indexImagem) => (
                                        <div className='imagem' key={indexImagem}>
                                            <img src={buscarImagem(imagem.imagem)} alt={`imagem do produto ${imagem.nome}`} />
                                        </div>
                                    ))
                                ) : (
                                    <p>Nenhum produto disponível</p>
                                )}
                            </div>
                            <div className="produtos">
                                {produtosPorGrupo[index] && produtosPorGrupo[index].length > 0 ? (
                                    produtosPorGrupo[index].map((produto, produtoIndex) => (
                                        <div className="produto" key={`produto-${produtoIndex}`}>
                                            <div className="cabecalho">
                                                <div className="titulo"><h3>{produto.nome}</h3></div>
                                                <div className="preco"><p>{produto.valor}</p></div>
                                            </div>
                                            <div className="descricao">
                                                <p>{produto.descricao}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Nenhum produto disponível</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="moldurainferior">
                    <img className="moldura molduraesquerda" src='/assets/img/moldura.png' alt='moldura esquerda fim'></img>
                    <h1>Atualizações em: 18/04/2024</h1>
                    <img className="moldura molduradireita" src='/assets/img/moldura.png' alt='moldura direita fim'></img>
                </div>
            </div>
        </div>
    )
}