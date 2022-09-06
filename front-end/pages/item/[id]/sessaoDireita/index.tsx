import Styles from './index.module.scss';
import DivBotoes from './sessaoDireita.divBotoes';
import DivDados1 from './sessaoDireita.divDados1';
import DivDados2 from './sessaoDireita.divDados2';

export default function SessaoDireita({ item }: any) {
    return (
        <div className={Styles.sessaoDireita}>
            <span className={Styles.textoCinza}>{item?.itensTipos?.tipo}</span>
            <span className='titulo'>{item?.nome}</span>

            <DivDados1 item={item} />
            <DivBotoes item={item} />
            <DivDados2 item={item} />
            <span className='separadorHorizontal'></span>
            <span>SVG DE SEGURANÇA AQUI</span>
        </div>
    )
}

