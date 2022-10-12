import Image from 'next/image';
import EmojiMedicacao from '../../static/image/outros/emoji-meditacao.webp';
import { Fetch } from '../../utils/api/fetch';
import CONSTS_AJUDAS_TOPICOS from '../../utils/consts/data/constAjudasTopicos';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import iAjudaTopico from '../../utils/types/ajuda.topico';
import Styles from './index.module.scss';
import AjudaInputPesquisaTopico from './outros/ajuda.inputPesquisaTopico';
import AjudaTopico from './outros/ajuda.topico';

interface iParametros {
    listaTopicos: iAjudaTopico[];
}

export default function Index({ listaTopicos }: iParametros) {
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
            <AjudaInputPesquisaTopico />

            {/* #3 - Tópicos */}
            <AjudaTopico listaTopicos={listaTopicos} />
        </section>
    )
}

export async function getStaticProps() {
    const url = CONSTS_AJUDAS_TOPICOS.API_URL_GET_TODOS;
    const listaTopicos = await Fetch.getApi(url) as iAjudaTopico[];

    return {
        props: {
            listaTopicos
        },
        // revalidate: 60 // segundos
    }
}

