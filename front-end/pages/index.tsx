import { Fragment, useEffect, useState } from 'react';
import Carousel from '../components/carousel/carousel';
import ModuloAlternativo from '../components/modulo/modulo.alternativo';
import ModuloPrincipal from '../components/modulo/modulo.principal';
import CarouselDois from '../static/image/carousel/dois.webp';
import CarouselUm from '../static/image/carousel/um.webp';
import CONSTS_SISTEMA from '../utils/consts/sistema';
import CONSTS_ITENS from '../utils/data/constItens';
import CONSTS_USUARIOS from '../utils/data/constUsuarios';
import { Fetch } from '../utils/outros/fetch';
import HabilitarHttp from '../utils/outros/habilitarHttp';
import paginaCarregada from '../utils/outros/paginaCarregada';
import randomizarArray from '../utils/outros/randomizarArray';

export default function Home({ listaItens }: any) {
    document.title = `Início — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const [listaItensRandom, setListaItensRandom] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setListaItensRandom(randomizarArray(listaItens))
        paginaCarregada(false, 100, 300, setIsLoaded);
    }, [listaItens]);

    if (!isLoaded) {
        return false;
    }

    return (
        <main className='paddingPadrao margem3_5'>
            <Carousel
                isLoop={true}
                isShowPagination={false}
                listaSlides={[
                    { imagem: CarouselUm, url: '/xxx' },
                    { imagem: CarouselDois, url: '/xxx' }
                ]}
            />

            <div className='margem3'>
                {
                    listaItensRandom && listaItensRandom?.map((item: any, i: number) => (
                        <Fragment key={i}>
                            {
                                item?.length < 6 ? (
                                    <ModuloAlternativo
                                        i={i}
                                        usuarioId={item[0]?.usuarios?.usuarioId}
                                        usuarioNomeSistema={item[0]?.usuarios?.nomeUsuarioSistema}
                                        descricao='Isso é apenas um teste'
                                        listaItens={item}
                                    />
                                ) : (
                                    <ModuloPrincipal
                                        i={i}
                                        usuarioId={item[0]?.usuarios?.usuarioId}
                                        usuarioNomeSistema={item[0]?.usuarios?.nomeUsuarioSistema}
                                        descricao='Isso é apenas um teste'
                                        listaItens={item}
                                    />
                                )
                            }
                        </Fragment>
                    ))
                }
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </main>
    )
}

export async function getStaticProps() {
    HabilitarHttp();
    let listaItens = [];

    // Pegar todos os usuários;
    const urlUsuarios = CONSTS_USUARIOS.API_URL_GET_TODOS;
    const usuarios = await Fetch.getApi(urlUsuarios, null);

    if (usuarios) {
        for (const u of usuarios) {
            // Encontrar os itens com base no usuário;
            const urlItens = `${CONSTS_ITENS.API_URL_GET_POR_USUARIO_ID}/${u.usuarioId}`;
            const itens = await Fetch.getApi(urlItens, null);

            if (itens?.length) {
                listaItens.push(itens);
            }
        }
    }

    return {
        props: {
            listaItens
        },
        // revalidate: 60 // segundos
    }
}