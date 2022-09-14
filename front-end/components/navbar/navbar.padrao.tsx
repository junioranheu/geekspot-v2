import { faGear, faQuestionCircle, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Dispatch, Fragment, useState } from 'react';
import { debounce } from 'ts-debounce'; // debounce: https://www.npmjs.com/package/ts-debounce | Delay React onMouseOver event: https://stackoverflow.com/a/68349975
import CONSTS_UPLOAD from '../../utils/consts/data/constUpload';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import { Auth } from '../../utils/context/usuarioContext';
import emojiAleatorio from '../../utils/outros/emojiAleatorio';
import Botao from '../outros/botao';
import Ajuda from '../svg/ajuda';
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
    const fotoPerfil = (Auth?.get()?.foto ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${Auth?.get()?.foto}` : Auth?.get()?.fotoPerfilAlternativa);

    const [isExibirPainelNavbarPadrao, setIsExibirPainelNavbarPadrao] = useState(false);
    const debounceFecharPainelNavbarPadrao = debounce(() => setIsExibirPainelNavbarPadrao(false), 500); // Delay React onMouseOver event: https://stackoverflow.com/a/68349975

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
                    <Link href='/'><a title={`Voltar ao início do ${CONSTS_SISTEMA.NOME_SISTEMA}`}><Logo width='2rem' /></a></Link>
                    <NavbarFiltro />
                </div>

                <div className={Styles.divDireita} onMouseLeave={() => debounceFecharPainelNavbarPadrao()}>
                    <Link href='/xxx'><a className={Styles.efeitoBottom}>Produtos</a></Link>
                    <Link href='/xxx'><a className={Styles.efeitoBottom}>Promoções</a></Link>
                    <span className='separador'></span>

                    <Ajuda url='/ajuda/' />

                    {
                        isAuth ? (
                            <Fragment>
                                <div className={Styles.divPerfil} onMouseEnter={() => abrirPainelNavbarPadrao()}>
                                    <Image src={fotoPerfil} width={30} height={30} alt='' />

                                    {
                                        isExibirPainelNavbarPadrao && (
                                            <div className={Styles.divPainel}>
                                                <div className={`${Styles.wrapperDivPainel} animate__animated animate__fadeInUp animate__faster`}>
                                                    <b>Olá,&nbsp;<span className='cor-principal'>@{nomeUsuario}</span> {emojiAleatorio()}</b>

                                                    <div className={`${Styles.divItens} margem1`}>
                                                        <Botao texto='Meus negócios' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                                                        <Link href='/'><a><FontAwesomeIcon icon={faStoreAlt} size='sm' />&nbsp;Minha lojinha</a></Link>
                                                        <Link href='/'><a><FontAwesomeIcon icon={faGear} size='sm' />&nbsp;Configurações</a></Link>
                                                        <Link href='/ajuda/'><a><FontAwesomeIcon icon={faQuestionCircle} size='sm' />&nbsp;Ajuda</a></Link>
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