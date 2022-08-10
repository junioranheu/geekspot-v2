import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import Styles from '../../styles/footer.module.scss';
import { ModoDarkContext, StorageModoDark } from '../../utils/context/modoDarkContext';

export default function Footer() {
    const modoDarkContext = useContext(ModoDarkContext); // Contexto do modo dark;
    const [isModoDark, setIsModoDark] = [modoDarkContext?.isModoDarkContext[0], modoDarkContext?.isModoDarkContext[1]];
    const [teste, setTeste] = [modoDarkContext?.testeContext[0], modoDarkContext?.testeContext[1]];

    useEffect(() => {
        alterarModo(isModoDark);
    }, [isModoDark]);

    useEffect(() => {
        console.log('Teste {modoDarkContext?.testeContext[0]}', teste);
    }, [teste]);

    function alterarModo(isModoDark: boolean | undefined) {
        if (isModoDark) {
            // console.log('Ativar modo dark');
            document.documentElement.style.setProperty('--preto', '#FFFFFF'); // Preto fica branco;
            document.documentElement.style.setProperty('--super-preto', '#F2F2F2'); // Super preto fica creme;
            document.documentElement.style.setProperty('--branco', '#1A1A1A'); // Branco fica preto;
            document.documentElement.style.setProperty('--cinza', '#F2F2F2'); // Cinza fica creme acinzentado;
            document.documentElement.style.setProperty('--cinza-secundario', '#F2F2F2'); // Cinza escuro fica creme acinzentado;  
            document.documentElement.style.setProperty('--cor-border-hr', 'rgba(255, 255, 255, 20%)'); // Cinza "apagado" para branco "apagado";
        } else {
            // console.log('Ativar modo light');
            document.documentElement.style.setProperty('--preto', '#1A1A1A');
            document.documentElement.style.setProperty('--super-preto', '#000000');
            document.documentElement.style.setProperty('--branco', '#FFFFFF');
            document.documentElement.style.setProperty('--cinza', '#313131');
            document.documentElement.style.setProperty('--cinza-secundario', '#242424');
            document.documentElement.style.setProperty('--cor-border-hr', 'rgba(42, 42, 42, 20%)');
        }

        // Atualizar no localStorage;
        setIsModoDark(isModoDark);
        StorageModoDark.update({ isModoDark: isModoDark });
    }

    return (
        <footer className={Styles.footer}>
            {/* Principal */}
            <div className={Styles.principal}>
                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>GeekSpot</span>

                    <Link href='/'><a>Sobre</a></Link>
                    <Link href='/'><a>Time</a></Link>
                    <Link href='/'><a>Aea <span className='efeito-new'>novo</span></a></Link>
                    <Link href='/'><a>Blog</a></Link>
                    <Link href='/'><a>Atualizações</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Plataformas</span>

                    <Link href='/'><a>Web</a></Link>
                    <Link href='/'><a>macOS</a></Link>
                    <Link href='/'><a>Windows</a></Link>
                    <Link href='/'><a>iOS</a></Link>
                    <Link href='/'><a>Android</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Seja membro</span>

                    <Link href='/'><a>Usuário</a></Link>
                    <Link href='/'><a>Loja</a></Link>
                    <Link href='/'><a>Investidor</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Sobre</span>

                    <Link href='/'><a>Comunidade</a></Link>
                    <Link href='/'><a>Empresa</a></Link>
                    <Link href='/'><a>Carreiras</a></Link>
                    <Link href='/'><a>Legal</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Suporte</span>

                    <Link href='/'><a>Usando o GeekSpot</a></Link>
                    <Link href='/'><a>Contas</a></Link>
                    <Link href='/'><a>Compras</a></Link>
                    <Link href='/'><a>Trocas</a></Link>
                    <Link href='/'><a>Contato</a></Link>
                </div>
            </div>

            {/* Secundária */}
            <div className={Styles.secundaria}>
                {/* Esquerda */}
                <div>
                    <span>
                        Copyright © {new Date().getFullYear()} — GeekSpot — Desenvolvido por

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
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={(isModoDark ? faSun : faMoon)} size='lg' onClick={() => alterarModo(!isModoDark)} />
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