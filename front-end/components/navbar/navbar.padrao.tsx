import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Dispatch, Fragment } from 'react';
import CONSTS_SISTEMA from '../../utils/consts/sistema';
import { Auth } from '../../utils/context/usuarioContext';
import emojiAleatorio from '../../utils/outros/emojiAleatorio';
import Botao from '../outros/botao';
import Logo from '../svg/logo';
import NavbarFiltro from './navbar.filtro';
import Styles from './navbar.padrao.module.scss';

interface iParametros {
    auth: any;
    isAuth: boolean | undefined;
    setIsAuth: Dispatch<boolean>;
}

export default function NavbarPadraoDois({ auth, isAuth, setIsAuth }: iParametros) {

    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? 'usuário';

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
                    <Link href='/'><a title={`Voltar ao início do ${CONSTS_SISTEMA.NOME_SISTEMA}`}><Logo width='0.9rem' cor='var(--preto)' /></a></Link>
                    <NavbarFiltro />
                </div>

                <div className={Styles.divDireita}>
                    <Link href='/xxx'><a>Produtos</a></Link>
                    <Link href='/xxx'><a>Promoções 🔥</a></Link>
                    <span className='separador'></span>

                    {
                        isAuth ? (
                            <Fragment>
                                <span className={Styles.divOla}>Olá,&nbsp;<span className={Styles.ola}>@{nomeUsuario}</span> {emojiAleatorio()}</span>
                                <span className='separador'></span>
                                <Botao texto='Sair' url={null} isNovaAba={false} handleFuncao={() => deslogar()} Svg={null} refBtn={null} isEnabled={true} />
                            </Fragment>
                        ) : (
                            <Botao texto='Entrar agora mesmo' url='/usuario/entrar' isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                        )
                    }
                </div>
            </div>
        </nav>
    )
}