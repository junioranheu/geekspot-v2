import nProgress from 'nprogress';
import { Fragment, useContext, useEffect, useState } from 'react';
import Carousel from '../components/carousel/carousel';
import ModuloAlternativo from '../components/modulo/modulo.alternativo';
import ModuloPrincipal from '../components/modulo/modulo.principal';
import CarouselDois from '../static/image/carousel/dois.webp';
import CarouselDoisBlack from '../static/image/carousel/dois_black.webp';
import CarouselUm from '../static/image/carousel/um.webp';
import CarouselUmBlack from '../static/image/carousel/um_black.webp';
import { Fetch } from '../utils/api/fetch';
import HabilitarHttp from '../utils/api/habilitarHttp';
import CONSTS_ITENS from '../utils/consts/data/constItens';
import CONSTS_USUARIOS from '../utils/consts/data/constUsuarios';
import CONSTS_SISTEMA from '../utils/consts/outros/sistema';
import { ModoDarkContext } from '../utils/context/modoDarkContext';
import paginaCarregada from '../utils/outros/paginaCarregada';
import randomizarArray from '../utils/outros/randomizarArray';
import iItem from '../utils/types/item';
import iUsuario from '../utils/types/usuario';

interface iParametros {
    listaItens: iItem[];
}

export default function Home({ listaItens }: iParametros) {
    document.title = `Início — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const modoDarkContext = useContext(ModoDarkContext); // Contexto do modo dark;
    const [isModoDark, setIsModoDark] = [modoDarkContext?.isModoDarkContext[0], modoDarkContext?.isModoDarkContext[1]];

    const [listaItensRandom, setListaItensRandom] = useState<iItem[]>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setListaItensRandom(randomizarArray(listaItens) as iItem[])
        paginaCarregada(false, 100, 300, setIsLoaded);
        nProgress.done();
    }, [listaItens]);

    if (!isLoaded) {
        return false;
    }

    return (
        <main className='paddingPadrao'>
            <Carousel
                isLoop={true}
                isShowPagination={true}
                listaSlides={[
                    { imagem: (isModoDark ? CarouselUmBlack : CarouselUm), url: '/xxx' },
                    { imagem: (isModoDark ? CarouselDoisBlack : CarouselDois), url: '/xxx' }
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
                                        titulo={item[0]?.usuarios?.usuariosInformacoes?.lojinhaTitulo}
                                        descricao={item[0]?.usuarios?.usuariosInformacoes?.lojinhaDescricao}
                                        listaItens={item}
                                    />
                                ) : (
                                    <ModuloPrincipal
                                        i={i}
                                        usuarioId={item[0]?.usuarios?.usuarioId}
                                        usuarioNomeSistema={item[0]?.usuarios?.nomeUsuarioSistema}
                                        titulo={item[0]?.usuarios?.usuariosInformacoes?.lojinhaTitulo}
                                        descricao={item[0]?.usuarios?.usuariosInformacoes?.lojinhaDescricao}
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
    const listaUsuarios = await Fetch.getApi(urlUsuarios) as iUsuario[];

    if (listaUsuarios) {
        for (const u of listaUsuarios) {
            // Encontrar os itens com base no usuário;
            const urlItens = `${CONSTS_ITENS.API_URL_GET_BY_USUARIO_ID}/${u?.usuarioId}`;
            const itens = await Fetch.getApi(urlItens) as iItem[];

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