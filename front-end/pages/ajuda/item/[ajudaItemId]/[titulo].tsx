import Router from 'next/router';
import { useEffect, useState } from 'react';
import SetaDois from '../../../../components/svg/seta.dois';
import { Fetch } from '../../../../utils/api/fetch';
import CONSTS_AJUDAS_ITENS from '../../../../utils/consts/data/constAjudasItens';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import ajustarUrl from '../../../../utils/outros/ajustarUrl';
import paginaCarregada from '../../../../utils/outros/paginaCarregada';
import iAjudaItem from '../../../../utils/types/ajuda.item';
import Styles from './item.module.scss';

interface iParametros {
    ajudaItem: iAjudaItem;
}

export default function ItemAjuda({ ajudaItem }: iParametros) {

    document.title = `${(ajudaItem?.titulo ?? 'Ajuda')} — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 300, 600, setIsLoaded);
    }, [ajudaItem]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={`${Styles.main} paddingPadrao`}>
            <div className={Styles.divVoltar} onClick={() => Router.push('/ajuda/')}>
                <SetaDois width={16} url={null} title='Voltar' isCorPrincipal={true} />
                <span className='texto pointer cor-principal-hover'>Voltar à central de ajuda</span>
            </div>

            <div className='margem3'>
                <div className={Styles.titulo} dangerouslySetInnerHTML={{ __html: ('aea' ?? '') }} />
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticPaths() {
    // Todos os itens de ajuda;
    const url = CONSTS_AJUDAS_ITENS.API_URL_GET_TODOS;
    const listaAjudasItens = await Fetch.getApi(url) as iAjudaItem[];
    // console.log(listaAjudasItens);

    // Gerar o "paths";
    const paths = listaAjudasItens?.map((i: iAjudaItem) => ({
        params: {
            ajudaItemId: i.ajudaItemId.toString(),
            titulo: ajustarUrl(i.titulo)
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context: any) {
    const id = context.params.ajudaItemId;

    // Item (ajuda);
    const url = `${CONSTS_AJUDAS_ITENS.API_URL_GET_BY_ID}/${id}`;
    const ajudaItem = await Fetch.getApi(url) as iAjudaItem[];
    // console.log(ajudaItem);

    return {
        props: {
            ajudaItem
        },
        // revalidate: 10 // segundos
    }
}