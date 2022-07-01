import Styles from '../../styles/navbarPadrao.module.css';
import Lupa from '../svg/lupa';
import Xis from '../svg/xis';

export default function InputFiltroNavbar({ handleLupa }) {
    return (
        <div className={`${Styles.divLupa} animate__animated animate__fadeIn`}>
            <div>
                <Lupa width='1.5rem' cor='rgba(255, 255, 255, 0.7)' />
                <input className={Styles.inputPesquisaNavbar} type='text' placeholder='Busque algo aqui...' />
                <button className={Styles.botaoXis} onClick={() => handleLupa()}><Xis height='1rem' width='1rem' cor='rgba(255, 255, 255, 0.7)' /></button>
            </div>
        </div>
    )
}