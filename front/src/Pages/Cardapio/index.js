import './index.scss';
import axios from 'axios'

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GrupoCardapio from '../../Components/grupoCardapio/GrupoCardapio';
import { Link } from 'react-router-dom';
import ButtonList from '../../Components/ButtonList/ButtonList';


export default function Cardapio() {
    const { cardapio } = useParams();
    const [dados, setDados] = useState([]);
    const [dadosSubcategorias, setDadosSubcategorias] = useState([]);
    const [selectedItem, setSelectedItem] = useState(cardapio);
    const [produtos, setProdutos] = useState(dados);
    const [subcategorias, setSubcategorias] = useState([]);
    const [produtosPorGrupo, setProdutosPorGrupo] = useState({});

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        dadosSubcategorias.forEach(element => {
            if (item == element.nomeSubcategoria) {
                item = element.idSubcategoria;
            }
        });

        const produtosFiltrados = produtos.filter(produto => produto.subcategoriaProduto === item);
        const produtosPorGrupo = {};
        produtosFiltrados.forEach(produto => {
            if (!produtosPorGrupo[produto.nomeGrupo]) {
                produtosPorGrupo[produto.nomeGrupo] = [];
            }
            produtosPorGrupo[produto.nomeGrupo].push(produto);
        });
        setProdutosPorGrupo(produtosPorGrupo);
    };

    useEffect(() => {
        handleSelectItem(selectedItem);
    }, [dadosSubcategorias]);

    useEffect(() => {
        async function fetchData() {
            try {
                let produtosResponse = await axios.get('http://127.0.0.1:5000/produto');
                let infoProdutos = produtosResponse.data;
                setDados(infoProdutos);

                let subcategoriasResponse = await axios.get('http://127.0.0.1:5000/subcategorias/categoria/7');
                let infoSubcategorias = subcategoriasResponse.data;
                setDadosSubcategorias(infoSubcategorias);

                const subcategoriasArray = [];
                infoSubcategorias.forEach(item => {
                    if (!subcategoriasArray.includes(item.nomeSubcategoria)) {
                        subcategoriasArray.push(item.nomeSubcategoria);
                    }
                });
                setSubcategorias(subcategoriasArray);

                setProdutos(infoProdutos);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        }
        fetchData();
    }, [selectedItem]);

    return (
        <div className="bodyCPrincipal">
            <header>
                <div className='menu'>
                    <Link to="/">Home</Link>
                    <ButtonList items={subcategorias} onSelect={handleSelectItem}></ButtonList>
                    <a href="">Contato</a>
                </div>
                <div className='logo'><img src='/assets/img/logo circular.png'></img></div>
            </header>
            <div className="bodyCardapio">

                <div className="moldurasuperior">
                    <img className="moldura molduraesquerda" src='/assets/img/moldura.png'></img>
                    <h1>Menu {selectedItem}</h1>
                    <img className="moldura molduradireita" src='/assets/img/moldura.png'></img>
                </div>
                <div className="container">
                    <GrupoCardapio produtos={produtosPorGrupo}></GrupoCardapio>
                </div>
                <div className="moldurainferior">
                    <img className="moldura molduraesquerda" src='/assets/img/moldura.png'></img>
                    <h1>Atualizações em: 18/10/2023</h1>
                    <img className="moldura molduradireita" src='/assets/img/moldura.png'></img>
                </div>
            </div>
        </div>
    )
}