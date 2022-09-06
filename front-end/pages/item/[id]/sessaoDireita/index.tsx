import iItem from '../../../../utils/types/item';
import Styles from './index.module.scss';
import DivAvisoProtecao from './sessaoDireita.divAvisoProtecao';
import DivBotoes from './sessaoDireita.divBotoes';
import DivDados1 from './sessaoDireita.divDados1';
import DivDados2 from './sessaoDireita.divDados2';
import DivOwner from './sessaoDireita.divOwner';

export default function SessaoDireita({ item }: iItem) {
    return (
        <div className={Styles.sessaoDireita}>
            <span className={Styles.textoCinza}>{item?.itensTipos?.tipo}</span>
            <span className='titulo'>{item?.nome}</span>

            <DivDados1 item={item} />
            <DivBotoes item={item} />
            <DivDados2 item={item} />
            <DivAvisoProtecao />
            <DivOwner item={item} />
        </div>
    )
}

