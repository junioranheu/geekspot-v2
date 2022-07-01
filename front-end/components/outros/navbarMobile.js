import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useContext, useState } from 'react';
import Styles from '../../styles/navbarMobile.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import Geekspot from '../svg/geekspot';
import Hamburguer from '../svg/hamburguer';
import Lupa from '../svg/lupa';
import Xis from '../svg/xis';

export default function NavbarMobile() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [isLupa, setIsLupa] = useState(false);

    function handleLupa() {
        setIsLupa(!isLupa);
    }

    function deslogar() {
        NProgress.start();

        // Deslogar;
        Auth.deleteUsuarioLogado();
        NProgress.done();

        // Voltar à tela principal;
        Router.push('/');

        // Desatribuir autenticação ao contexto de usuário;
        setTimeout(function () {
            setIsAuth(false);
        }, 100);
    }

    return (
        <nav className={Styles.navbar}>
            {
                !isLupa ? (
                    <div className={Styles.wrapper}>
                        <div className={Styles.divEsquerda}>
                            <Link href='/'><a className={Styles.iconeCorInvertida}><Geekspot width='0.9rem' cor='var(--branco)' />&nbsp;&nbsp;GeekSpot</a></Link>
                            <a onClick={() => handleLupa()}><Lupa height='1.5rem' width='1.5rem' cor='rgba(255, 255, 255, 0.7)' /></a>
                        </div>

                        <div className={Styles.divDireita}>
                            {/* {
                                isAuth ? (
                                    <Fragment>
                                        <span className={Styles.margemBotao} onClick={() => deslogar()}>
                                            <Botao texto={'Sair'} url={''} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                                        </span>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Link href='/usuario/criar-conta'><a>Crie sua conta</a></Link>

                                        <span className={Styles.margemBotao}>
                                            <Botao texto={'Entrar'} url={'/usuario/entrar'} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                                        </span>
                                    </Fragment>
                                )
                            } */}

                            <Hamburguer width='1rem' cor='var(--branco)'/>
                        </div>
                    </div>
                ) : (
                    <div className={`${Styles.divLupa} animate__animated animate__fadeIn`}>
                        <div>
                            <Lupa width='1.5rem' cor='rgba(255, 255, 255, 0.7)' />
                            <input className={Styles.inputPesquisaNavbar} type='text' placeholder='Busque algo aqui...' />
                            <button className={Styles.botaoXis} onClick={() => handleLupa()}><Xis height='1rem' width='1rem' cor='rgba(255, 255, 255, 0.7)' /></button>
                        </div>
                    </div>
                )
            }
        </nav>
    )
}
