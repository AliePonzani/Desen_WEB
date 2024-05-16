import './index.scss';

export default function CardsProdutos(params) {
    return (
        <div className="cardsProduto">
            <div className="image-container">
                <img src={`http://127.0.0.1:5000/${params.teste.imagem}`} alt="" className="card-image" />
            </div>
            <div className="text-container">
                <p className="product-title">{params.teste.nomeProduto}</p>
                <p className="product-title">{params.teste.descricaoProduto}</p>
                <p className="product-price">{params.teste.valorProduto}</p>
            </div>
        </div>
    );
}
