import Image from 'next/image';
import ImgCinza from '../../../../static/image/outros/cinza.webp';
import CONSTS_SISTEMA from '../../../../utils/consts/sistema';
import gerarImagemPerfilRandom from '../../../../utils/outros/gerarImagemPerfilRandom';
import iItem from '../../../../utils/types/item';
import Styles from './index.module.scss';

export default function DivOwner({ item }: iItem) {
    return (
        <div className={`${Styles.divOwner} margem1_5 flexColumn`}>
            <div className={Styles.divOwnerInner}>
                <div className='flexRow'>
                    <div className={Styles.divFoto}>
                        <Image src={(item?.usuarios?.foto ?? gerarImagemPerfilRandom() ?? ImgCinza)} alt='' />
                    </div>

                    <div>
                        <span>{(item?.usuarios?.nomeUsuarioSistema ? `@${item?.usuarios?.nomeUsuarioSistema}` : '-')}</span>
                        <span>{item?.usuarios?.nomeCompleto}</span>
                    </div>
                </div>

                <div>
                    <span>Botão de seguir</span>
                </div>
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.divOwnerInner}>
                <div>
                    <span>À venda</span>
                    <span>xxx</span>
                </div>

                <div>
                    <span>Vendidos</span>
                    <span>xxx</span>
                </div>
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.divOwnerInner}>
                <div>
                    <span>Tempo médio de envio</span>
                    <span>xxx</span>
                </div>

                <div>
                    <span>No {CONSTS_SISTEMA.NOME_SISTEMA} desde</span>
                    <span>xxx</span>
                </div>
            </div>
        </div>
    )
}