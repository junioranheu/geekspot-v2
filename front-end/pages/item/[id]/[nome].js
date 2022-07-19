import { faCcMastercard, faCcPaypal, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Fragment, useContext, useEffect, useState } from 'react';
import Botao from '../../../components/outros/botao';
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

    function gerarTextoParcelas(preco) {
        const msg = `2x de R$ ${(preco / 2)} sem juros`;
        return msg;
    }

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
                        className={Styles.efeitoImagemHover}
                    />
                </div>

                <div className={Styles.sessaoDireita}>
                    <span className='titulo'>{item?.nome}</span>

                    <div className='margem2 flexColumn'>
                        <span className={Styles.textoNegrito}>R$ {item?.preco}</span>
                        <span className='texto'>{gerarTextoParcelas(item?.preco)}</span>

                        <div className={Styles.divFormasPagamento}>
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={faCcVisa} size='lg' title='Visa'/>
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={faCcMastercard} size='lg' title='Mastercard' />
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={faCcPaypal} size='lg' title='PayPal' />
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={faMoneyBill1} size='lg' title='Dinheiro ou pix' />
                        </div>
                    </div>
 
                    <div className='margem2 flexColumn'>
                        <div className={Styles.botaoCustom} onClick={null}>
                            <Botao texto={'Eu quero'} url={''} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                        </div>

                        <div className={`${Styles.botaoCustom} margem1`} onClick={null}>
                            <Botao texto={'Adicionar ao carrinho'} url={''} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                        </div>

                        <div className={`${Styles.botaoCustom} margem1`} onClick={null}>
                            <Botao texto={'Fazer oferta'} url={''} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                        </div>
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