import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Dispatch, Fragment, useEffect } from 'react';
import ImgCinza from '../../static/image/outros/cinza.webp';
import CONSTS_SISTEMA from '../../utils/consts/sistema';
import { Auth } from '../../utils/context/usuarioContext';
import emojiAleatorio from '../../utils/outros/emojiAleatorio';
import gerarImagemPerfilRandom from '../../utils/outros/gerarImagemPerfilRandom';
import Botao from '../outros/botao';
import Logo from '../svg/logo';
import NavbarFiltro from './navbar.filtro';
import Styles from './navbar.padrao.module.scss';

interface iParametros {
    auth: any;
    isAuth: boolean | undefined;
    setIsAuth: Dispatch<boolean>;
    isExibirPainelNavbarPadrao: boolean;
    setIsExibirPainelNavbarPadrao: Dispatch<boolean>;
}

export default function NavbarPadrao({ auth, isAuth, setIsAuth, isExibirPainelNavbarPadrao, setIsExibirPainelNavbarPadrao }: iParametros) {

    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? 'usuário';
    const fotoPerfilRandom = Auth?.get()?.fotoPerfilAlternativa ?? ImgCinza;

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

    useEffect(() => {
        gerarImagemPerfilRandom();
    }, []);

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
                                <div className={Styles.divPerfil} onMouseEnter={() => setIsExibirPainelNavbarPadrao(true)}>
                                    <Image src={fotoPerfilRandom} />

                                    {
                                        isExibirPainelNavbarPadrao && (
                                            <div className={`${Styles.divPainel} animate__animated animate__fadeInDown animate__faster`}>
                                                <div className={Styles.wrapperDivPainel}>
                                                    <span className={Styles.divOla}>Olá,&nbsp;<span className={Styles.ola}>@{nomeUsuario}</span> {emojiAleatorio()}</span>
                                                    <span>aea</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>

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