import './index.scss';

export default function CardsProdutos(params) {
    return (
        <div className="cardsProduto">
            <div className="image-container">
                <img
                    src={`http://127.0.0.1:5000/${params.teste.imagem}`}
                    alt={`Card do produto ${params.teste.nome}`} 
                    className="card-image"
                />
            </div>
            <div className="text-container">
                <p className="product-title">{params.teste.nome}</p>
                <p className="product-title">{params.teste.descricao}</p>
                <p className="product-price">{params.teste.valor}</p>
            </div>
        </div>
    );
}
