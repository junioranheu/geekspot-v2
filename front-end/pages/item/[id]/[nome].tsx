import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Boleto from '../../../components/svg/boleto';
import Mastercard from '../../../components/svg/mastercard';
import Pix from '../../../components/svg/pix';
import Visa from '../../../components/svg/visa';
import ImgCinza from '../../../static/image/outros/cinza.webp';
import CONSTS_SISTEMA from '../../../utils/consts/sistema';
import { Auth } from '../../../utils/context/usuarioContext';
import CONSTS_ITENS from '../../../utils/data/constItens';
import CONSTS_UPLOAD from '../../../utils/data/constUpload';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';
import Styles from './index.module.scss';

export default function Item({ item }: any) {
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 300, 600, setIsLoaded);
    }, []);

    function gerarTextoParcelas(preco: number) {
        const msg = `2x de R$ ${(preco / 2)} sem juros`;
        return msg;
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>{(item?.nome ? `${item?.nome} — ${CONSTS_SISTEMA.NOME_SISTEMA}` : CONSTS_SISTEMA.NOME_SISTEMA)}</title>
            </Head>

            <section className={`${Styles.wrapper} margem3`}>
                <div className={Styles.sessaoPrincipal}>
                    <div className={Styles.sessaoEsquerda}>
                        <Image
                            src={(item.imagem ? `${CONSTS_UPLOAD.API_URL_GET_ITENS_IMAGENS}/${item.imagem}` : ImgCinza)}
                            width={500}
                            height={500}
                            alt=''
                            className={Styles.efeitoImagemHover}
                        />
                    </div>

                    <div className={Styles.sessaoDireita}>
                        <span className='titulo'>{item?.nome}</span>

                        <div className={`${Styles.divDados} margem1 flexColumn`}>
                            <div className={Styles.headerDivDados}>
                                Preço especial por tempo limitado
                            </div>

                            <div className={Styles.bodyDivDados}>
                                <span className={Styles.textoNegrito}>R$ {item?.preco}</span>
                                <span className={Styles.texto}>{gerarTextoParcelas(item?.preco)}</span>

                                <div className={Styles.divFormasPagamento}>
                                    <Pix />
                                    <Visa />
                                    <Mastercard />
                                    <Boleto />
                                </div>

                                <div className={Styles.botaoCustom}>
                                    <Botao texto='Eu quero' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                                </div>
                            </div>
                        </div>

                        <div className='margem1 flexColumn'>
                            <div className={Styles.botaoCustom2}>
                                <Botao texto='Fazer oferta' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                            </div>

                            <div className={`${Styles.botaoCustom2} margem1`}>
                                <Botao texto='Adicionar ao carrinho' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas os itens;
    const url = CONSTS_ITENS.API_URL_GET_TODOS;
    const itens = await Fetch.getApi(url, null);
    // console.log(itens);

    // Gerar o "paths";
    const paths = itens?.map((i: any) => ({
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

export async function getStaticProps(context: any) {
    const id = context.params.id;

    // Item;
    const url = `${CONSTS_ITENS.API_URL_GET_POR_ID}/${id}`;
    const item = await Fetch.getApi(url, null);
    // console.log(item);

    return {
        props: {
            item
        },
        // revalidate: 10 // segundos
    }
}