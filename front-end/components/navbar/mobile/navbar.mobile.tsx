import Link from 'next/link';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { Fragment, useContext, useEffect, useState } from 'react';
import useEmoji from '../../../hooks/outros/useEmoji';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import deslogar from '../../../utils/outros/deslogar';
import ModalLateralLayout from '../../modal.lateral/_modal.lateral.layout';
import Botao from '../../outros/botao';
import Hamburguer from '../../svg/hamburguer';
import Logo from '../../svg/logo';
import NavbarFiltro from '../outros/navbar.filtro';
import MenuUsuarioOpcoes from '../padrao/menus/menu.usuario.opcoes';
import Styles from './navbar.mobile.module.scss';

export default function NavbarMobile() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const router = useRouter();
    
    const [isModalLateralOpen, setIsModalLateralOpen] = useState(false);
    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';
    const idUsuario = Auth?.get()?.usuarioId ?? 0;
    const urlPerfil = `/usuario/perfil/${idUsuario}/@${nomeUsuario}`;
    const emoji = useEmoji();

    function simularLoading() {
        if (router.asPath !== '/') {
            nProgress.start();
        }
    }

    useEffect(() => {
        nProgress.done();
    }, [router.asPath]);

    return (
        <Fragment>
            {/* #01 - Navbar */}
            <nav className={Styles.navbar}>
                <div className={Styles.wrapper}>
                    <div className={Styles.divEsquerda}>
                        <Link href='/'><a title={`Voltar ao início do ${CONSTS_SISTEMA.NOME_SISTEMA}`} onClick={() => simularLoading()}><Logo width='2rem' /></a></Link>
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
                titulo={`Olá${(nomeUsuario && `, <b>@${nomeUsuario}</b>`)} ${emoji}`}
            >
                <div className={Styles.divAtalhos} onClick={() => setIsModalLateralOpen(false)}>
                    {/* Mesmas opções usadas no menu de usuário */}
                    <div className={`${Styles.divOpcoes} margem0_5`}>
                        <MenuUsuarioOpcoes isMeuPerfilBotao={false} urlPerfil={urlPerfil} />
                    </div>
 
                    <div className='divisao margem1'>ou</div>

                    {
                        isAuth ? (
                            <div className={Styles.sessaoBotoes}>
                                <div className={Styles.botaoPadrao}>
                                    <Botao texto={`Sair do ${CONSTS_SISTEMA.NOME_SISTEMA}`} url={null} isNovaAba={false} handleFuncao={() => deslogar(setIsAuth)} Svg={null} refBtn={null} isEnabled={true} />
                                </div>
                            </div>
                        ) : (
                            <div className={Styles.sessaoBotoes}>
                                <div className='divBotaoInvertido'>
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