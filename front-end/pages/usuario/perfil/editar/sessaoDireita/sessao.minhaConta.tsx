import { Fragment } from 'react';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

export default function SessaoMinhaConta({ usuario }: iParametros) {
    return (
        // =-=-=-=-=-=-=-=-=-=-=-= #4 - Minha conta =-=-=-=-=-=-=-=-=-=-=-= 
        <Fragment>
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Minha conta' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className={`${Styles.botaoFonteVermelha} divBotaoInvertido`}>
                        <Botao texto='Quero excluir minha conta' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

