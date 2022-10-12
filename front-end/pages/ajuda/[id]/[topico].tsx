import { useEffect, useState } from 'react';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_AJUDAS_TOPICOS from '../../../utils/consts/data/constAjudasTopicos';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import paginaCarregada from '../../../utils/outros/paginaCarregada';
import removerHTML from '../../../utils/outros/removerHTML';
import iAjudaTopico from '../../../utils/types/ajuda.topico';
import Styles from './topico.module.scss';

interface iParametros {
    topico: iAjudaTopico;
}

export default function Topico({ topico }: iParametros) {
    document.title = `AAAAAAAAAA — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 300, 600, setIsLoaded);
    }, []);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={`${Styles.wrapper} margem3`}>
            <div className={Styles.sessaoPrincipal}>
                <span>aaaa</span>
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticPaths() {
    // Todos os tópicos;
    const url = CONSTS_AJUDAS_TOPICOS.API_URL_GET_TODOS;
    const topicos = await Fetch.getApi(url) as iAjudaTopico[];
    // console.log(topicos);

    // Gerar o "paths";
    const paths = topicos?.map((i: iAjudaTopico) => ({
        params: {
            id: i.ajudaTopicoId.toString(),
            nome: ajustarUrl(removerHTML(i.topico))
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context: any) {
    const id = context.params.id;

    // Itens do tópico;
    const url = `${XXX.API_URL_GET_BY_ID}/${id}`;
    const item = await Fetch.getApi(url) as xxx;

    return {
        props: {
            item
        },
        // revalidate: 10 // segundos
    }
}