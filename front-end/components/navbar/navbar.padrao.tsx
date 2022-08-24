import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import { debounce } from 'ts-debounce'; // debounce: https://www.npmjs.com/package/ts-debounce | Delay React onMouseOver event: https://stackoverflow.com/a/68349975
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
}

export default function NavbarPadrao({ auth, isAuth, setIsAuth }: iParametros) {

    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? 'usuário';
    const fotoPerfilRandom = Auth?.get()?.fotoPerfilAlternativa ?? ImgCinza;

    const [isExibirPainelNavbarPadrao, setIsExibirPainelNavbarPadrao] = useState(false);
    const debounceFecharPainelNavbarPadrao = debounce(() => setIsExibirPainelNavbarPadrao(false), 500); // Delay React onMouseOver event: https://stackoverflow.com/a/68349975

    useEffect(() => {
        gerarImagemPerfilRandom();
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

    function abrirPainelNavbarPadrao() {
        setIsExibirPainelNavbarPadrao(true);
        debounceFecharPainelNavbarPadrao.cancel();
    }

    return (
        <nav className={Styles.navbar}>
            <div className={Styles.wrapper}>
                <div className={Styles.divEsquerda}>
                    <Link href='/'><a title={`Voltar ao início do ${CONSTS_SISTEMA.NOME_SISTEMA}`}><Logo width='0.9rem' cor='var(--preto)' /></a></Link>
                    <NavbarFiltro />
                </div>

                <div className={Styles.divDireita} onMouseLeave={() => debounceFecharPainelNavbarPadrao()}>
                    <Link href='/xxx'><a>Produtos</a></Link>
                    <Link href='/xxx'><a>Promoções 🔥</a></Link>
                    <span className='separador'></span>

                    {
                        isAuth ? (
                            <Fragment>
                                <div className={Styles.divPerfil} onMouseEnter={() => abrirPainelNavbarPadrao()}>
                                    <Image src={fotoPerfilRandom} />

                                    {
                                        isExibirPainelNavbarPadrao && (
                                            <div className={Styles.divPainel}>
                                                <div className={`${Styles.wrapperDivPainel} animate__animated animate__fadeInUp animate__faster`}>
                                                    <b>Olá,&nbsp;<span className='cor-principal'>@{nomeUsuario}</span> {emojiAleatorio()}</b>

                                                    <div className={`${Styles.divItens} margem0_5`}>
                                                        <span>aea</span>
                                                        <span>aea</span>
                                                        <span>aea</span>
                                                    </div>
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