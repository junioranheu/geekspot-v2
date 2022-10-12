import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import Styles from './index.module.scss';

export default function Index() {
    document.title = `Ajuda — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    return (
        <section className={Styles.main}>
            <h1>Ajuda</h1>
        </section>
    )
}
 
