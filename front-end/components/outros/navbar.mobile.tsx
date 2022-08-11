import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import Styles from '../../styles/navbar.mobile.module.scss';
import Geekspot from '../svg/geekspot';
import Hamburguer from '../svg/hamburguer';
import Lupa from '../svg/lupa';
import Xis from '../svg/xis';
import Botao from './botao';
import InputFiltroNavbar from './inputFiltroNavbar';

interface iParametros {
    auth: any;
    isAuth: boolean | undefined;
    setIsAuth: Dispatch<boolean>;
}

export default function NavbarMobile({ auth, isAuth, setIsAuth }: iParametros) {
    const [isLupa, setIsLupa] = useState(false);
    const [isHamburguer, setIsHamburguer] = useState(false);

    function handleLupa() {
        setIsLupa(!isLupa);
    }

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
        NProgress.start();

        // Deslogar;
        auth.delete();
        NProgress.done();

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
                {
                    !isLupa ? (
                        <div className={Styles.wrapper}>
                            <div className={Styles.divEsquerda}>
                                <Link href='/'><a className={Styles.iconeCorInvertida}><Geekspot width='0.9rem' cor='var(--preto)' />&nbsp;&nbsp;GeekSpot</a></Link>
                                <a onClick={() => handleLupa()}><Lupa width='1.5rem' cor='var(--preto)' /></a>
                            </div>

                            <div className={Styles.divDireita}>
                                <a onClick={() => handleHamburguer()}><Hamburguer width='1rem' cor='var(--preto)' /></a>
                            </div>
                        </div>
                    ) : (
                        <InputFiltroNavbar handleLupa={handleLupa} />
                    )
                }
            </nav>

            {/* #02 - Hamburguer */}
            {
                isHamburguer && (
                    <section className={`${Styles.sessaoHamburguer} animate__animated animate__slideInRight animate__faster`}>
                        <div className={Styles.divDireita}>
                            <a onClick={() => handleHamburguer()}><Xis height='1.7rem' width='1.7rem' cor='var(--branco)' /></a>
                        </div>

                        <div className={Styles.divAtalhos}>
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
                                        <div className={Styles.botaoPadrao} onClick={() => deslogar()}>
                                            <Botao texto={'Sair'} url={''} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={Styles.sessaoBotoes}>
                                        <div className={Styles.botaoCriarConta}>
                                            <Botao texto={'Crie sua conta'} url={'/usuario/criar-conta'} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                                        </div>

                                        <div className={Styles.botaoPadrao}>
                                            <Botao texto={'Entrar agora'} url={'/usuario/entrar'} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
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