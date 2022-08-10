import Styles from '../../styles/navbar1.module.scss';
import EmojiAleatorio from '../../utils/outros/emojiAleatorio';
import Seta from '../svg/seta';

export default function Navbar1() {
    return (
        <nav className={Styles.navbar}>
            <span>GeekSpot: plataforma digital para compras, vendas e trocas de artigos geek</span>

            <span>{EmojiAleatorio()}</span>

            <span className='pointer cor-principal-hover' onClick={() => { window.open('https://github.com/junioranheu', '_blank'); }}>
                Saiba mais <Seta width='1rem' />
            </span>
        </nav>
    )
}