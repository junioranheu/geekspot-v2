import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EmojiMedicacao from '../../../static/image/outros/emoji-meditacao.webp';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import paginaCarregada from '../../../utils/outros/paginaCarregada';
import Styles from '../index.module.scss';
import AjudaInputPesquisaTopico from '../outros/ajuda.inputPesquisaTopico';

export default function BuscaAjuda() {

    document.title = `Ajuda — ${CONSTS_SISTEMA.NOME_SISTEMA}`;
    const router = useRouter();

    const [queryBuscada, setQueryBuscada] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const query = router?.query?.query ?? '';
        setQueryBuscada(query.toString());
        
        paginaCarregada(true, 300, 600, setIsLoaded);
    }, [router.query]);

    if (!isLoaded) {
        return false;
    }

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
            <AjudaInputPesquisaTopico topicoBuscado={queryBuscada} />

            {/* #3 - Resultados da busca */}
            <div className='margem3'>
                {queryBuscada}
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}


