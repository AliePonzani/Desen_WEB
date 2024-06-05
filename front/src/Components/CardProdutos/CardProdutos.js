import { buscarImagem } from '../../API/chamadas';
import './index.scss';

export default function CardsProdutos(params) {
    return (
        <div className="cardsProduto">
            <div className="image-container">
                <img
                    src={`${buscarImagem(params.teste.imagem)}`}
                    alt={`Card do produto ${params.teste.nome}`} 
                    className="card-image"
                />
            </div>
            <div className="text-container">
                <p className="product-title">{params.teste.nome}</p>
                <p className="product-title">{params.teste.peso}</p>
                <p className="product-price">R${params.teste.valor}</p>
            </div>
        </div>
    );
}
