import Router from 'next/router';
import nProgress from 'nprogress';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Facebook, List } from 'react-content-loader'; // https://www.npmjs.com/package/react-content-loader
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
import CONSTS_ERROS from '../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../utils/consts/outros/sistema';
import CONSTS_TELAS from '../utils/consts/outros/telas';
import { ModoDarkContext } from '../utils/context/modoDarkContext';
import { Aviso } from '../utils/outros/aviso';
import paginaCarregada from '../utils/outros/paginaCarregada';
import randomizarArray from '../utils/outros/randomizarArray';
import iItem from '../utils/types/item';

export default function Home() {

    document.title = `Início — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const modoDarkContext = useContext(ModoDarkContext); // Contexto do modo dark;
    const [isModoDark, setIsModoDark] = [modoDarkContext?.isModoDarkContext[0], modoDarkContext?.isModoDarkContext[1]];

    const [listaItensRandom, setListaItensRandom] = useState<iItem[]>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function getItens() {
            nProgress.start();
            const url = CONSTS_ITENS.API_URL_LISTA_ITENS_GROUP_BY_USUARIO;
            const resposta = await Fetch.getApi(url) as iItem[];
            // console.log(resposta);

            if (!resposta) {
                nProgress.done();
                Aviso.error('Houve um problema interno ao carregar os dados da página inicial', 10000);
                Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.ERRO_INTERNO } });
                return false;
            }

            setListaItensRandom(randomizarArray(resposta) as iItem[])
            nProgress.done();
            paginaCarregada(false, 100, 300, setIsLoaded);
        }

        getItens();
    }, []);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='paddingPadrao'>
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
                    listaItensRandom ? (
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
                    ) : (
                        <div className='flexColumn'>
                            <Facebook style={{ width: '100%' }} />
                            <List style={{ width: '100%' }} />
                            <List style={{ width: '100%' }} />
                        </div>
                    )
                }
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticProps() {
    HabilitarHttp();

    return {
        props: {

        }
    }
}