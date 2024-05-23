import './index.scss';

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ButtonList from '../../Components/ButtonList/ButtonList';
import { buscarDados } from '../../Service/api.service';


export default function Cardapio() {
    const { cardapio } = useParams();
    const [selectedItem, setSelectedItem] = useState();
    const [cardapios, setCardapios] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [produtosPorGrupo, setProdutosPorGrupo] = useState({});


    const handleSelectItem = (item) => {
        setSelectedItem(item);
        console.log(cardapios);
        console.log(item);
        const cardapioEncontrado = cardapios.find(cardapio => cardapio.nome === item);
        console.log(cardapioEncontrado);
        if (cardapioEncontrado) {
            buscarGruposDoCardapio(cardapioEncontrado.id);
        }
    };

    const buscarGruposDoCardapio = async (idCardapio) => {
        let grupos = await buscarDados(`grupo/cardapio/${idCardapio}`)
        setGrupos(grupos);

        const promisesProdutos = grupos && grupos.length > 0 ? grupos.map(grupo => buscarProdutosDoGrupo(grupo.id)) : [];

        const produtosPorGrupo = await Promise.all(promisesProdutos);

        setProdutosPorGrupo(produtosPorGrupo);
    }

    const buscarProdutosDoGrupo = async (idGrupo) => {
        let produtos = await buscarDados(`produto/grupo/${idGrupo}`)
        return produtos;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                let cardapios = await buscarDados("cardapio");
                setCardapios(cardapios);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (cardapios.length > 0) {
            handleSelectItem(cardapio);
        }
    }, [cardapios]);

    return (
        <div className="bodyPrincipal">
            <header>
                <div className='menu'>
                    <Link to="/">Home</Link>
                    <ButtonList
                        items={cardapios && cardapios.map(item => item.nome)}
                        onSelect={handleSelectItem}
                    >Cardápios
                    </ButtonList>
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
                                {produtosPorGrupo[index] && produtosPorGrupo[index].map((imagem, indexImagem) => (
                                    <div className='imagem' key={indexImagem}>
                                        <img src={`http://127.0.0.1:5000/${imagem.imagem}`} alt={`imagem do produto ${imagem.nome}`} />
                                    </div>
                                ))}
                            </div>
                            <div className="produtos">
                                {produtosPorGrupo[index] && produtosPorGrupo[index].map((produto, produtoIndex) => (
                                    <div className="produto" key={`produto-${produtoIndex}`}>
                                        <div className="cabecalho">
                                            <div className="titulo"><h3>{produto.nome}</h3></div>
                                            <div className="preco"><p>{produto.valor}</p></div>
                                        </div>
                                        <div className="descricao">
                                            <p>{produto.descricao}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="moldurainferior">
                    <img className="moldura molduraesquerda" src='/assets/img/moldura.png' alt='moldura esquerda fim'></img>
                    <h1>Atualizações em: 18/10/2024</h1>
                    <img className="moldura molduradireita" src='/assets/img/moldura.png' alt='moldura direita fim'></img>
                </div>
            </div>
        </div>
    )
}