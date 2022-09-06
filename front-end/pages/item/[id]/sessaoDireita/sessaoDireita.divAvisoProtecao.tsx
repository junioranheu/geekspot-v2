import Link from 'next/link';
import Seguranca from '../../../../components/svg/seguranca';
import CONSTS_SISTEMA from '../../../../utils/consts/sistema';
import Styles from './index.module.scss';

export default function DivAvisoProtecao() {
    return (
        <div className={`${Styles.divAvisoProtecao} margem0_5 flexColumn`}>
            <span className='separadorHorizontal'></span>

            <div className={Styles.divInnerAvisoProtecao}>
                <div className={Styles.divSvgSeguranca}>
                    <Seguranca  />
                </div>

                <span className={Styles.textoAviso}>
                    Para proteger sua compra nunca transfira dinheiro ou se comunique fora do&nbsp;
                    {CONSTS_SISTEMA.NOME_SISTEMA}. Veja mais <Link href='/'><a className='cor-principal' target='_blank'>dicas de segurança</a></Link>
                </span>
            </div>
        </div>
    )
}