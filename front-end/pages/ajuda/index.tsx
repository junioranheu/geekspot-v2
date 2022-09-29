import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';

export default function Index() {
    document.title = `Ajuda — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    return (
        <div>
            <h1>Ajuda</h1>
        </div>
    )
}

