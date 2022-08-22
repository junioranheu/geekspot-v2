import EmojiAleatorio from '../../utils/outros/emojiAleatorio';
import Seta from '../svg/seta';
import Styles from './navbar.small.module.scss';

export default function NavbarSmall() {
    return (
        <nav className={Styles.navbar}>
            {/* <span>GeekSpot: plataforma digital para compras, vendas e trocas de artigos geek</span> */}
            <span>GeekSpot — Um upgrade ao seu inventário</span>

            <span>{EmojiAleatorio()}</span>

            <span className='pointer cor-principal-hover' onClick={() => { window.open('https://github.com/junioranheu', '_blank'); }}>
                Saiba mais <Seta width='1rem' />
            </span>
        </nav>
    )
}