import Link from 'next/link';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { Fragment, useContext, useEffect, useState } from 'react';
import { debounce } from 'ts-debounce'; // debounce: https://www.npmjs.com/package/ts-debounce | Delay React onMouseOver event: https://stackoverflow.com/a/68349975
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import deslogar from '../../../utils/outros/deslogar';
import Botao from '../../outros/botao';
import Ajuda from '../../svg/ajuda';
import Inbox from '../../svg/inbox';
import Logo from '../../svg/logo';
import NavbarFiltro from '../outros/navbar.filtro';
import MenuProdutos from './menus/menu.produtos';
import NavbarPadraoMenuUsuario from './menus/menu.usuario';
import Styles from './navbar.padrao.module.scss';

export default function NavbarPadrao() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const router = useRouter();

    const [isExibirMenuUsuario, setIsExibirMenuUsuario] = useState(false);
    const debounceFecharMenuUsuario = debounce(() => setIsExibirMenuUsuario(false), 500); // Delay React onMouseOver event: https://stackoverflow.com/a/68349975

    function simularLoading() {
        if (router.asPath !== '/') {
            nProgress.start();
        }
    }

    useEffect(() => {
        nProgress.done();
    }, [router.asPath]);

    return (
        <nav className={Styles.navbar}>
            <div className={Styles.wrapper}>
                <div className={Styles.divEsquerda}>
                    <Link href='/'><a title={`Voltar ao início do ${CONSTS_SISTEMA.NOME_SISTEMA}`} onClick={() => simularLoading()}><Logo width='2rem' /></a></Link>
                    <NavbarFiltro />
                </div>

                <div className={Styles.divDireita} onMouseLeave={() => debounceFecharMenuUsuario()}>
                    <MenuProdutos efeitoBottomCSS={Styles.efeitoBottom} />

                    <Link href='/xxx'><a className={Styles.efeitoBottom}>Promoções</a></Link>
                    <span className='separador'></span>

                    <Ajuda width={24} url={CONSTS_TELAS.AJUDA} title='Acessar página de ajuda' isCorPrincipal={false} />

                    {
                        isAuth && (
                            <Fragment>
                                <Inbox width={24} url='/xxx' title='Acessar inbox para visualizar suas mensagens' isCorPrincipal={false} />
                            </Fragment>
                        )
                    }

                    {
                        isAuth && (
                            <NavbarPadraoMenuUsuario
                                isExibirMenuUsuario={isExibirMenuUsuario}
                                setIsExibirMenuUsuario={setIsExibirMenuUsuario}
                                debounceFecharMenuUsuario={debounceFecharMenuUsuario}
                            />
                        )
                    }

                    {
                        isAuth ? (
                            <Fragment>
                                <span className='separador'></span>

                                <div onClick={() => deslogar(setIsAuth)}>
                                    <Botao texto='Sair' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <span className='separador'></span>
                                <Botao texto='Entrar agora mesmo' url='/usuario/entrar' isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                            </Fragment>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

