import { buscarImagem } from '../../API/chamadas';
import './index.scss';

export default function CardEvento(params) {
    const converterDataeHora = (dataHora) => {
        const data = new Date(dataHora);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        const hora = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');

        const teste = [`${dia}/${mes}/${ano}`, `${hora}:${minutos}`]

        return teste;
    }
    const dataInicio = converterDataeHora(params.teste.dataInicio);
    const dataFim = converterDataeHora(params.teste.dataFim);
    return (
        <div className="cardEvento">
            <div className="image-container">
                <img
                    src={`${buscarImagem(params.teste.imagem)}`}
                    alt={`Card do evento ${params.teste.titulo}`}
                    className="card-image" 
                />
            </div>
            <div className="text-container">
                <p className="evento-title">{params.teste.titulo}</p>
                <p className="evento-date">Dia {dataInicio[0]} até {dataFim[0]}</p>
                <p className="evento-date">Horário {dataInicio[1]} ás {dataFim[1]}</p>
                <p className="evento-descrition">{params.teste.descricao}</p>
            </div>
        </div>
    );
}