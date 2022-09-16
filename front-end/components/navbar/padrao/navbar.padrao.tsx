import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Dispatch, Fragment, useState } from 'react';
import { debounce } from 'ts-debounce'; // debounce: https://www.npmjs.com/package/ts-debounce | Delay React onMouseOver event: https://stackoverflow.com/a/68349975
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import Botao from '../../outros/botao';
import Ajuda from '../../svg/ajuda';
import Inbox from '../../svg/inbox';
import Logo from '../../svg/logo';
import NavbarFiltro from '../outros/navbar.filtro';
import MenuProdutos from './menus/menu.produtos';
import NavbarPadraoMenuUsuario from './menus/menu.usuario';
import Styles from './navbar.padrao.module.scss';

interface iParametros {
    auth: any;
    isAuth: boolean | undefined;
    setIsAuth: Dispatch<boolean>;
}

export default function NavbarPadrao({ auth, isAuth, setIsAuth }: iParametros) {

    const [isExibirMenuUsuario, setIsExibirMenuUsuario] = useState(false);
    const debounceFecharMenuUsuario = debounce(() => setIsExibirMenuUsuario(false), 500); // Delay React onMouseOver event: https://stackoverflow.com/a/68349975

    function deslogar() {
        nProgress.start();

        // Deslogar;
        auth.delete();
        nProgress.done();

        // Voltar à tela principal;
        Router.push('/');

        // Desatribuir autenticação ao contexto de usuário;
        setTimeout(function () {
            setIsAuth(false);
        }, 100);
    }

    return (
        <nav className={Styles.navbar}>
            <div className={Styles.wrapper}>
                <div className={Styles.divEsquerda}>
                    <Link href='/'><a title={`Voltar ao início do ${CONSTS_SISTEMA.NOME_SISTEMA}`}><Logo width='2rem' /></a></Link>
                    <NavbarFiltro />
                </div>

                <div className={Styles.divDireita} onMouseLeave={() => debounceFecharMenuUsuario()}>
                    <MenuProdutos efeitoBottomCSS={Styles.efeitoBottom} />

                    <Link href='/xxx'><a className={Styles.efeitoBottom}>Promoções</a></Link>
                    <span className='separador'></span>

                    <Ajuda width={24} url='/ajuda/' title='Acessar página de ajuda' />

                    {
                        isAuth && (
                            <Fragment>
                                <Inbox width={24} url='/xxx' title='Acessar inbox para visualizar suas mensagens' />
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
                                <Botao texto='Sair' url={null} isNovaAba={false} handleFuncao={() => deslogar()} Svg={null} refBtn={null} isEnabled={true} />
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