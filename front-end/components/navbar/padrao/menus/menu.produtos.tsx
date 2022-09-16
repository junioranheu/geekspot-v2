import Link from 'next/link';
import { Dispatch, Fragment, useEffect } from 'react';
import Styles from './menu.produtos.module.scss';

interface iParametros {
    isExibirMenuProdutos: boolean;
    setIsExibirMenuProdutos: Dispatch<boolean>;
    debounceFecharMenuProdutos: { (this: unknown, ...args: [] & any[]): Promise<void>; cancel: (reason?: any) => void; }; // debounce;
    efeitoBottomCSS: string;
}

export default function MenuProdutos({ isExibirMenuProdutos, setIsExibirMenuProdutos, debounceFecharMenuProdutos, efeitoBottomCSS }: iParametros) {

    function abrirMenuProdutos() {
        setIsExibirMenuProdutos(true);
        debounceFecharMenuProdutos.cancel();
    }

    useEffect(() => {
        // console.log(isExibirMenuProdutos);
        if (isExibirMenuProdutos) {
            // console.log('Menu aberto');
            document.getElementsByClassName('sessaoPrincipal')[0].classList.add('backgroundBlur');
            document.getElementsByTagName('footer')[0].classList.add('backgroundBlur');
            document.body.style.overflow = 'hidden';
        } else {
            // console.log('Menu fechado');
            document.getElementsByClassName('sessaoPrincipal')[0].classList.remove('backgroundBlur');
            document.getElementsByTagName('footer')[0].classList.remove('backgroundBlur');
            document.body.style.overflow = 'auto';
        }
    }, [isExibirMenuProdutos])

    return (
        <Fragment>
            <Link href='/xxx'><a className={efeitoBottomCSS} onMouseEnter={() => abrirMenuProdutos()}>Produtos</a></Link>

            {
                isExibirMenuProdutos && (
                    <div className={`${Styles.divMenu} animate__animated animate__fadeIn`}>
                        <div className={Styles.wrapperDivPainel}>
                            <div className={Styles.conteudo}>
                                <h1>aea</h1>
                            </div>
                        </div>
                    </div>
                )
            }
        </Fragment>
    )
}