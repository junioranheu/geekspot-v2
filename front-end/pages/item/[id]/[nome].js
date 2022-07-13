import Image from 'next/image';
import { Fragment, useContext, useEffect, useState } from 'react';
import ImgCinza from '../../../static/image/cinza.webp';
import Styles from '../../../styles/item.module.css';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_ITENS from '../../../utils/data/constItens';
import CONSTANTS_UPLOAD from '../../../utils/data/constUpload';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';

export default function Item({ item }) {
    // console.log(item);
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
        <Fragment>
            <section className={`${Styles.sessaoPrincipal} margem5`}>
                <div className={Styles.sessaoEsquerda}>
                    <Image
                        src={(item.imagem ? `${CONSTANTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.imagem}` : ImgCinza)}
                        width={500}
                        height={500}
                        alt=''
                    />
                </div>

                <div className={Styles.sessaoDireita}>
                    <span className='titulo'>xxx <span className='grifar'>{item?.nome}</span></span>

                    <div className='margem1'>
                        Teste
                    </div>
                </div>
            </section>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </Fragment>
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