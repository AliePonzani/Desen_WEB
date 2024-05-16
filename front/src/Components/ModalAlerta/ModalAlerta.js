

export default function ModalAlerta(params) {
    return (
        <div>
            <p>Deseja realmente excluir {params.item}</p>
            <div>
                <button>Sim</button>
                <button>Cancelar</button>
            </div>
        </div>
    )
}