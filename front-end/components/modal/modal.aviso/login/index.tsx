import Link from 'next/link';
import { Dispatch } from 'react';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import Botao from '../../../outros/botao';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
    titulo: string | null;
    descricao: string;
}

export default function ModalAvisoLogin({ handleModal, titulo, descricao }: iParametros) {
    return (
        <div className={Styles.main}>
            <span className={Styles.titulo}>{(titulo ?? 'Opa, pera aí...')}</span>
            <span className={`${Styles.texto} margem1`}>{descricao}</span>

            <div className='margem1'>
                <Botao texto='Entrar agora mesmo' url='/usuario/entrar' isNovaAba={false} handleFuncao={() => handleModal(false)} Svg={null} refBtn={null} isEnabled={true} />
            </div>

            <span className='separadorHorizontal'></span>
            <span className={Styles.termos}>
                Ao entrar ou criar uma conta, você está de acordo com os <Link href='/'><a>termos de serviço e a política de privacidade</a></Link> do {CONSTS_SISTEMA.NOME_SISTEMA}
            </span>
        </div>
    )
}