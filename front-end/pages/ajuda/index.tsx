import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import Styles from './index.module.scss';

export default function Index() {
    document.title = `Ajuda — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    return (
        <main className={`${Styles.wrapper} paddingPadrao`}>
            <h1>Ajuda</h1>
        </main>
    )
}

