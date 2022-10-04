import { Fragment } from 'react';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

export default function SessaoDadosPessoais({ usuario }: iParametros) {
    return (
        <Fragment>
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Dados pessoais' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Nome completo</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Nome da lojinha</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>E-mail</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Senha</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Aniversário</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>CPF</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className={Styles.divInput}>
                        <span className={Styles.item}>Telefone</span>
                        <input className='input' type='text' />
                    </div>

                    <span className='separadorHorizontal'></span>
                    <div className='divBotaoInvertido'>
                        <Botao texto='Salvar alterações dos seus dados pessoais' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

