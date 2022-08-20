import Typewriter from 'typewriter-effect'; // https://www.npmjs.com/package/typewriter-effect
import Styles from '../../styles/navbar.padrao2.module.scss';
import Lupa from '../svg/lupa';

export default function InputFiltroNavbar() {
    return (
        <div className={`${Styles.divLupa} animate__animated animate__fadeIn`}>
            <div>
                <input
                    className={Styles.inputPesquisaNavbar}
                    type='text'
                    placeholder={`Busque algo aqui ${1}...`}
                />

                <Lupa width='1.5rem' cor='var(--preto)' />

                <Typewriter
                    options={{
                        strings: ['Hello', 'World'],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
        </div>
    )
}