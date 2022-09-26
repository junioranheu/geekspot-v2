import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import EmojiAleatorio from '../../../utils/outros/emojiAleatorio';
import Seta from '../../svg/seta';
import Styles from './navbar.small.module.scss';

export default function NavbarSmall() {
    return (
        <nav className={Styles.navbar}>
            <span>{CONSTS_SISTEMA.NOME_SISTEMA} — {CONSTS_SISTEMA.SLOGAN}</span>

            <span>{EmojiAleatorio()}</span>

            <span className={`${Styles.inverterCorHover} pointer`} onClick={() => { window.open('https://github.com/junioranheu', '_blank'); }}>
                Saiba mais <Seta width='1rem' />
            </span>
        </nav>
    )
}