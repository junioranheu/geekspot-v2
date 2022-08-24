import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import CONSTS_SISTEMA from '../../utils/consts/sistema';
import { Auth } from '../../utils/context/usuarioContext';
import emojiAleatorio from '../../utils/outros/emojiAleatorio';
import Botao from '../outros/botao';
import Hamburguer from '../svg/hamburguer';
import Logo from '../svg/logo';
import Xis from '../svg/xis';
import NavbarFiltro from './navbar.filtro';
import Styles from './navbar.mobile.module.scss';

interface iParametros {
    auth: any;
    isAuth: boolean | undefined;
    setIsAuth: Dispatch<boolean>;
}

export default function NavbarMobile({ auth, isAuth, setIsAuth }: iParametros) {

    const [isHamburguer, setIsHamburguer] = useState(false);
    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';

    function handleHamburguer() {
        setIsHamburguer(!isHamburguer);
    }

    // Efeito de blur no fundo;
    useEffect(() => {
        if (isHamburguer) {
            // console.log('Hamburguer aberto');
            document.getElementsByClassName('sessaoPrincipal')[0].classList.add('backgroundBlur');
            document.getElementsByTagName('footer')[0].classList.add('backgroundBlur');
        } else {
            // console.log('Hamburguer fechado');
            document.getElementsByClassName('sessaoPrincipal')[0].classList.remove('backgroundBlur');
            document.getElementsByTagName('footer')[0].classList.remove('backgroundBlur');
        }
    }, [isHamburguer]);

    // Ao "destruir" componente (force que volte ao normal, sem blur ao fundo);
    useEffect(() => {
        return () => {
            // console.log('Componente destruído');
            document.getElementsByClassName('sessaoPrincipal')[0].classList.remove('backgroundBlur');
            document.getElementsByTagName('footer')[0].classList.remove('backgroundBlur');
        }
    }, []);

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
        <Fragment>
            {/* #01 - Navbar */}
            <nav className={Styles.navbar}>
                <div className={Styles.wrapper}>
                    <div className={Styles.divEsquerda}>
                        <Link href='/'><a title={`Voltar ao início do ${CONSTS_SISTEMA.NOME_SISTEMA}`}><Logo width='0.9rem' cor='var(--preto)' /></a></Link>
                        <NavbarFiltro />
                    </div>

                    <div className={Styles.divDireita}>
                        <a onClick={() => handleHamburguer()}><Hamburguer width='1rem' cor='var(--preto)' /></a>
                    </div>
                </div>
            </nav>

            {/* #02 - Hamburguer */}
            {
                isHamburguer && (
                    <section className={`${Styles.sessaoHamburguer} animate__animated animate__slideInRight animate__faster`}>
                        <div className={Styles.divDireita}>
                            <a onClick={() => handleHamburguer()}><Xis height='1.7rem' width='1.7rem' cor='var(--branco)' /></a>
                        </div>

                        {
                            nomeUsuario && (
                                <span className={Styles.divOla}>Olá,&nbsp;<span className={Styles.ola}>@{nomeUsuario}</span> {emojiAleatorio()}</span>
                            )
                        }

                        <div className={Styles.divAtalhos} onClick={() => handleHamburguer()}>
                            <Link href='/xxx'><a>Produtos</a></Link>
                            <Link href='/xxx'><a>Promoções 🔥</a></Link>

                            {
                                isAuth && (
                                    <Fragment>
                                        <Link href='/xxx'><a>xxx</a></Link>
                                        <Link href='/xxx'><a>xxx</a></Link>
                                    </Fragment>
                                )
                            }

                            <div className='divisao margem1'>ou</div>

                            {
                                isAuth ? (
                                    <div className={Styles.sessaoBotoes}>
                                        <div className={Styles.botaoPadrao}>
                                            <Botao texto='Sair' url={null} isNovaAba={false} handleFuncao={() => deslogar()} Svg={null} refBtn={null} isEnabled={true} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={Styles.sessaoBotoes}>
                                        <div className={Styles.botaoCriarConta}>
                                            <Botao texto='Crie sua conta' url='/usuario/criar-conta' isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                                        </div>

                                        <div className={Styles.botaoPadrao}>
                                            <Botao texto='Entrar agora' url='/usuario/entrar' isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                )
            }
        </Fragment>
    )
}