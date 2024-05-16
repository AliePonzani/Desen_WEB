import './GrupoCardapio.scss';
import React from 'react';
import banofe from "../../apoio/imagens/taca.jpg";
import croissant from "../../apoio/imagens/croissant.jpg";
import gelato from "../../apoio/imagens/gelato.jpg";
import ovosmexidos from "../../apoio/imagens/ovosmexidos.jpg";
import panquecas from "../../apoio/imagens/panquecas.jpg";

export default function GrupoCardapio(params) {
    const produtosPorGrupo = params.produtos;
    const caminhosFotos = [
        banofe,
        croissant,
        gelato,
        ovosmexidos,
        panquecas
    ];

    return (
        <div className="grupo-cardapio">
            {Object.keys(produtosPorGrupo).map(grupo => (
                <div key={grupo}>
                    <div className="cabecalho-Grupo">
                        <h1>{grupo}</h1>
                        <p>*Consulte disponibilidade</p>
                    </div>
                    <div className="imagens">
                        {caminhosFotos.map((imagem, index) => (
                            <div key={`imagem-${index}`} className="imagem" style={{backgroundImage: `url(${imagem})`}}></div>
                        ))}
                    </div>
                    <div className="produtos">
                        {produtosPorGrupo[grupo].map((produto, index) => (
                            <div className="produto" key={`produto-${index}`}>
                                <div className="cabecalho">
                                    <div className="titulo"><h3>{produto.nomeProduto}</h3></div>
                                    <div className="preco"><p>{produto.valorProduto}</p></div>
                                </div>
                                <div className="descricao">
                                    <p>{produto.descricaoProduto}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
