import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Dispatch, Fragment, useState } from 'react';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import { Auth } from '../../utils/context/usuarioContext';
import emojiAleatorio from '../../utils/outros/emojiAleatorio';
import ModalLateralLayout from '../modal.lateral/_modal.lateral.layout';
import Botao from '../outros/botao';
import Hamburguer from '../svg/hamburguer';
import Logo from '../svg/logo';
import NavbarFiltro from './navbar.filtro';
import Styles from './navbar.mobile.module.scss';

interface iParametros {
    auth: any;
    isAuth: boolean | undefined;
    setIsAuth: Dispatch<boolean>;
}

export default function NavbarMobile({ auth, isAuth, setIsAuth }: iParametros) {

    const [isModalLateralOpen, setIsModalLateralOpen] = useState(false);
    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';

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
                        <Link href='/'><a title={`Voltar ao início do ${CONSTS_SISTEMA.NOME_SISTEMA}`}><Logo width='2rem' /></a></Link>
                        <NavbarFiltro />
                    </div>

                    <div className={Styles.divDireita}>
                        <a onClick={() => setIsModalLateralOpen(true)}><Hamburguer width='1rem' cor='var(--preto)' /></a>
                    </div>
                </div>
            </nav>

            {/* #02 - Modal lateral */}
            <ModalLateralLayout
                handleModal={setIsModalLateralOpen}
                isOpen={isModalLateralOpen}
                titulo={`Olá${(nomeUsuario && `, <b>@${nomeUsuario}</b>`)} ${emojiAleatorio()}`}
            >
                <div className={Styles.divAtalhos} onClick={() => setIsModalLateralOpen(false)}>
                    <Link href='/xxx'><a>Produtos</a></Link>
                    <Link href='/xxx'><a>Promoções</a></Link>

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
            </ModalLateralLayout>
        </Fragment>
    )
}