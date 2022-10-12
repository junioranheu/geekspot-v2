import Image from 'next/image';
import EmojiMedicacao from '../../static/image/outros/emoji-meditacao.webp';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import Styles from './index.module.scss';
import InputPesquisaTopicoAjuda from './outros/inputPesquisaTopicoAjuda';

export default function Index() {
    document.title = `Ajuda — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    return (
        <section className={`${Styles.main} paddingPadrao paddingPadraoMargemGrande`}>
            {/* #1 - Título */}
            <div className={Styles.divTitulo}>
                <span>Central de ajuda</span>

                <div className='animate__animated animate__pulse animate__slower animate__infinite'>
                    <Image src={EmojiMedicacao} alt='' width={50} height={63} />
                </div>
            </div>

            {/* #2 - Input para filtragem dos tópicos */}
            <InputPesquisaTopicoAjuda />

            {/* #3 - Tópicos */}
        </section>
    )
}

