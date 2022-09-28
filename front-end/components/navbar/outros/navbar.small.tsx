import useEmoji from '../../../hooks/outros/useEmoji';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import Seta from '../../svg/seta';
import Styles from './navbar.small.module.scss';

export default function NavbarSmall() {

    const emoji = useEmoji();
    
    return (
        <nav className={Styles.navbar}>
            <span>
                <span className={`${Styles.nomeSistema} cor-verde-hover`}>{CONSTS_SISTEMA.NOME_SISTEMA}</span> — {CONSTS_SISTEMA.SLOGAN}
            </span>

            <span>{emoji}</span>

            <span className={Styles.separadorEspecial}></span>

            <span className={`${Styles.saibaMais} cor-verde-hover pointer`} onClick={() => { window.open('https://github.com/junioranheu', '_blank'); }}>
                Saiba mais <Seta width='1rem' />
            </span>
        </nav>
    )
}