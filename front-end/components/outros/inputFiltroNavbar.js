import Styles from '../../styles/navbarPadrao.module.css';
import Lupa from '../svg/lupa';
import Xis from '../svg/xis';

export default function InputFiltroNavbar({ handleLupa }) {
    return (
        <div className={`${Styles.divLupa} animate__animated animate__fadeIn`}>
            <div>
                <Lupa width='1.5rem' cor='var(--preto)' />
                <input className={Styles.inputPesquisaNavbar} type='text' placeholder='Busque algo aqui...' />
                <button className={Styles.botaoXis} onClick={() => handleLupa()}><Xis height='1rem' width='1rem' cor='#1A1A1A' /></button>
            </div>
        </div>
    )
}