import { Fragment } from 'react';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import AvisoSvg from '../../../../../components/svg/aviso';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

export default function SessaoMinhaConta({ usuario }: iParametros) {
    return (
        <Fragment>
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Minha conta' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className={`${Styles.botaoFonteVermelha} divBotaoInvertido`}>
                        <Botao
                            texto='&nbsp;&nbsp;Quero excluir minha conta'
                            url={null}
                            isNovaAba={false}
                            handleFuncao={() => null}
                            Svg={<AvisoSvg width={16} url={null} title={null} isCorPrincipal={false} />}
                            refBtn={null}
                            isEnabled={true}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

