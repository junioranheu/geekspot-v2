import TopHat from '../../../../../components/outros/topHat';
import Configuracao from '../../../../../components/svg/configuracao';
import Styles from './index.module.scss';

export default function SessaoDireita() {
    return (
        <div className={Styles.sessaoDireita}>
            <TopHat Svg={<Configuracao width={22} url={null} title={null} isCorPrincipal={false} />} titulo='Configurações' />

            <div className={`${Styles.main} margem1`}>
                <span>Sessão direita</span>
            </div>
        </div>
    )
}

 