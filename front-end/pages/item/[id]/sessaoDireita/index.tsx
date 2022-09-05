import Styles from './index.module.scss';
import DivBotoes from './sessaoDireita.divBotoes';
import DivDados from './sessaoDireita.divDados';

export default function SessaoDireita({ item }: any) {
    return (
        <div className={Styles.sessaoDireita}>
            <span className={Styles.textoCinza}>{item?.itensTipos?.tipo}</span>
            <span className='titulo'>{item?.nome}</span>

            <DivDados item={item} />
            <DivBotoes item={item} />
        </div>
    )
}

