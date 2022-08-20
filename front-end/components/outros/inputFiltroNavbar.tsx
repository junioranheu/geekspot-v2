import { Fragment, useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect'; // https://www.npmjs.com/package/typewriter-effect
import Styles from '../../styles/navbar.padrao2.module.scss';
import Lupa from '../svg/lupa';

export default function InputFiltroNavbar() {

    const teste = document.getElementsByClassName('Typewriter__wrapper');
    const [efeitoTexto, setEfeitoTexto] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            // @ts-ignore;
            const typewriter = teste[0]?.innerText;
            console.log(typewriter);
            setEfeitoTexto(typewriter);
        }, 100);

        return () => clearInterval(interval);
    }, [])

    return (
        <Fragment>
            <div className='esconder'>
                <Typewriter
                    options={{
                        strings: ['"PS4"', '"Xbox"', '"Naruto"', '"iPhone"', '"Breaking bad"', '"Headset"', '"Guitarra"'],
                        autoStart: true,
                        loop: true
                    }}
                />
            </div>

            <div className={`${Styles.divLupa} animate__animated animate__fadeIn`}>
                <div>
                    <input
                        className={Styles.inputPesquisaNavbar}
                        type='text'
                        placeholder={`Busque por ${efeitoTexto}`}
                    />

                    <Lupa width='1.5rem' cor='var(--preto)' />
                </div>
            </div>
        </Fragment>
    )
}