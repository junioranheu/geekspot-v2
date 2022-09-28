import Link from 'next/link';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { debounce } from 'ts-debounce'; // debounce: https://www.npmjs.com/package/ts-debounce | Delay React onMouseOver event: https://stackoverflow.com/a/68349975
import useItensTipos from '../../../../hooks/api/useItensTipos';
import ajustarUrl from '../../../../utils/outros/ajustarUrl';
import iItemTipo from '../../../../utils/types/itemTipo';
import Styles from './menu.produtos.module.scss';

interface iParametros {
    efeitoBottomCSS: string;
}

export default function MenuProdutos({ efeitoBottomCSS }: iParametros) {

    // Get todos os tipos de itens;
    const itensTipos = useItensTipos(false);

    const [isExibirMenuProdutos, setIsExibirMenuProdutos] = useState(false);
    const debounceFecharMenuProdutos = debounce(() => setIsExibirMenuProdutos(false), 500); // Delay React onMouseOver event: https://stackoverflow.com/a/68349975

    function abrirMenuProdutos() {
        setIsExibirMenuProdutos(true);
        debounceFecharMenuProdutos.cancel();
    }

    // Ao exibir ou deixar de exibir o menu de produtos;
    useEffect(() => {
        if (isExibirMenuProdutos) {
            // console.log('Menu aberto');
            document.getElementsByClassName('sessaoPrincipal')[0]?.classList.add('backgroundBlur');
            document.getElementsByTagName('footer')[0]?.classList.add('backgroundBlur');
            document.body.style.overflow = 'hidden';
        } else {
            // console.log('Menu fechado');
            document.getElementsByClassName('sessaoPrincipal')[0]?.classList.remove('backgroundBlur');
            document.getElementsByTagName('footer')[0]?.classList.remove('backgroundBlur');
            document.body.style.overflow = 'auto';
        }
    }, [isExibirMenuProdutos]);

    return (
        <Fragment>
            <Link href='/produtos'>
                <a
                    className={efeitoBottomCSS}
                    onMouseEnter={() => abrirMenuProdutos()}
                    onMouseLeave={() => debounceFecharMenuProdutos()}
                >
                    Produtos
                </a>
            </Link>

            {
                isExibirMenuProdutos && (
                    <div
                        className={`${Styles.divMenu} animate__animated animate__fadeIn`}
                        onMouseEnter={() => abrirMenuProdutos()}
                        onMouseLeave={() => debounceFecharMenuProdutos()}
                    >
                        <div className={Styles.wrapperDivPainel}>
                            <div className={Styles.conteudo}>
                                {
                                    itensTipos?.map((item: iItemTipo, i: number) => (
                                        <div className={Styles.item} key={item?.itemTipoId}>
                                            <span
                                                className='cor-principal-hover pointer'
                                                title={(item?.descricao ?? '')}
                                                onClick={() => Router.push(`/produtos/${item?.itemTipoId}/${ajustarUrl(item?.tipo)}`)}
                                            >
                                                {item?.tipo} {(item?.isNovoTipo === 1 && <span className='efeito-new'>em breve</span>)}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </Fragment>
    )
}

