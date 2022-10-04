import { Fragment } from 'react';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

export default function SessaoEndereco({ usuario }: iParametros) {
    return (
        // =-=-=-=-=-=-=-=-=-=-=-= #3 - Endereço =-=-=-=-=-=-=-=-=-=-=-= 
        <Fragment>
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Endereço' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>CEP</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Estado</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Cidade</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Bairro</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Rua</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Número da residência</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Referência</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className='divBotaoInvertido'>
                        <Botao texto='Salvar alterações do seu endereço' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

