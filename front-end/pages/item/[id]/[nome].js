import { useContext, useEffect, useState } from 'react';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_ITENS from '../../../utils/data/constItens';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';

export default function Item({ item }) {
    // console.log(cursos);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioId = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Título da página;
        document.title = item ? `GeekSpot — ${item?.nome}` : 'GeekSpot';

        paginaCarregada(true, 200, 500, setIsLoaded);
    }, [usuarioId, item]);

    if (!isLoaded) {
        return false;
    }
 
    return (
        <section className='flexColumn paddingPadrao margem5'>
            <div className='centralizarTexto'>
                <span className='titulo'>xxx <span className='grifar'>@{item?.nome}</span></span>
            </div>

            <div className='margem3'>
                Teste
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas os itens;
    const url = CONSTANTS_ITENS.API_URL_GET_TODOS;
    const itens = await Fetch.getApi(url, null);
    // console.log(itens);

    // Gerar o "paths";
    const paths = itens?.map(i => ({
        params: {
            id: i.itemId.toString(),
            nome: ajustarUrl(i.nome)
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;

    // Item;
    const url = `${CONSTANTS_ITENS.API_URL_GET_POR_ID}/${id}`;
    const item = await Fetch.getApi(url, null);
    // console.log(item);

    return {
        props: {
            item
        },
        // revalidate: 10 // segundos
    }
}