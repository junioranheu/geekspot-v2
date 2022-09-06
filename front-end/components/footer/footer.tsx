import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import { ModoDarkContext } from '../../utils/context/modoDarkContext';
import alterarModo from './alterarModo';
import Styles from './footer.module.scss';

export default function Footer() {

    const modoDarkContext = useContext(ModoDarkContext); // Contexto do modo dark;
    const [isModoDark, setIsModoDark] = [modoDarkContext?.isModoDarkContext[0], modoDarkContext?.isModoDarkContext[1]];

    useEffect(() => {
        alterarModo(isModoDark, setIsModoDark);
    }, [isModoDark, setIsModoDark]);

    return (
        <footer className={Styles.footer}>
            {/* Principal */}
            <div className={Styles.principal}>
                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>{CONSTS_SISTEMA.NOME_SISTEMA}</span>

                    <Link href='/'><a>Sobre</a></Link>   
                    <Link href='/'><a>Blog<span className='efeito-new'>novo</span></a></Link>
                    <Link href='/'><a>Time</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Seja membro</span>

                    <Link href='/'><a>Usuário</a></Link>
                    <Link href='/'><a>Loja</a></Link>
                    <Link href='/'><a>Investidor</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Plataformas</span>

                    <Link href='/'><a>Web</a></Link>
                    {/* <Link href='/'><a>macOS</a></Link>
                    <Link href='/'><a>Windows</a></Link> */}
                    <Link href='/'><a>iOS<span className='efeito-new'>em breve</span></a></Link>
                    <Link href='/'><a>Android<span className='efeito-new'>em breve</span></a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Sobre</span>

                    <Link href='/'><a>Legal</a></Link>
                    <Link href='/'><a>Comunidade</a></Link>
                    <Link href='/'><a>Empresa</a></Link>
                    <Link href='/'><a>Carreiras</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Suporte</span>

                    <Link href='/'><a>Trocas</a></Link>
                    <Link href='/'><a>Compras</a></Link>   
                    <Link href='/'><a>Vendas</a></Link>      
                    <Link href='/'><a>Contato</a></Link>
                </div>
            </div>

            {/* Secundária */}
            <div className={Styles.secundaria}>
                {/* Esquerda */}
                <div>
                    <span>
                        Copyright © {new Date().getFullYear()} — {CONSTS_SISTEMA.NOME_SISTEMA} — Desenvolvido por

                        <Link href='https://github.com/junioranheu'>
                            <a target='_blank' className='cor-principal-hover'>
                                &nbsp;@junioranheu
                            </a>
                        </Link>
                    </span>
                </div>

                {/* Direita */}
                <div className={Styles.direita}>
                    <div className={Styles.icones}>
                        <span title={`${(isModoDark ? 'Alternar para o modo light' : 'Alternar para o modo dark')}`}>
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={(isModoDark ? faSun : faMoon)} size='lg' onClick={() => alterarModo(!isModoDark, setIsModoDark)} />
                        </span>

                        <span title='GitHub'>
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={faGithub} size='lg' onClick={() => { window.open('https://github.com/junioranheu', '_blank') }} />
                        </span>

                        <span title='Instagram'>
                            {/* <FontAwesomeIcon className='pointer cor-principal-hover' icon={faInstagram} size='lg' onClick={() => { window.open('https://www.instagram.com/junioranheu/', '_blank') }} /> */}
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={faInstagram} size='lg' />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
} 