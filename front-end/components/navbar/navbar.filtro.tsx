import { Fragment, KeyboardEvent, useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect'; // https://www.npmjs.com/package/typewriter-effect
import randomizarArray from '../../utils/outros/randomizarArray';
import Lupa from '../svg/lupa';
import Styles from './navbar.filtro.module.scss';

export default function NavbarFiltro() {

    // Pegar os dados a cada X ms do elemento #Typewriter__wrapper;
    const tw = document.getElementsByClassName('Typewriter__wrapper');
    const [efeitoTypewriter__wrapper, setEfeitoTypewriter__wrapper] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            // @ts-ignore;
            const typewriter__wrapper = tw[0]?.innerText;
            setEfeitoTypewriter__wrapper(typewriter__wrapper);
        }, 100);

        return () => clearInterval(interval);
    }, [tw])

    const [isDivPesquisaFullWidth, setIsDivPesquisaFullWidth] = useState('');
    function handleEnter() {
        // console.log('handleEnter');
        setIsDivPesquisaFullWidth(Styles.divPesquisaFullWidth);
    }

    function handleLeave() {
        // console.log('handleLeave');
        setIsDivPesquisaFullWidth('');
    }

    const [listaOpcoes, setListaOpcoes] = useState<string[]>([]);
    useEffect(() => {
        const lista = [
            '"PS4"', '"Xbox"', '"Naruto"', '"iPhone"', '"Breaking bad"',
            '"Headset"', '"Guitarra"', '"Nintendo"', '"Pink Floyd"', '"Oasis"',
            '"Violão"', '"Walter White"', '"Harry Potter"', '"GTA SA"', '"PS5"',
            '"LOL"', '"Dota 2"', '"GTA 5"', '"Celulares"'
        ];

        const listaRandom = randomizarArray(lista);
        setListaOpcoes(listaRandom);
    }, [])

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleBuscar();
        }
    }

    const [txtFiltro, setTxtFiltro] = useState('');
    function handleBuscar() {
        console.log('handleBuscar():', txtFiltro);
    }

    return (
        <Fragment>
            <div className='esconder'>
                <Typewriter
                    options={{
                        strings: listaOpcoes,
                        autoStart: true,
                        loop: true
                    }}
                />
            </div>

            <div className={`${Styles.divPesquisa} ${isDivPesquisaFullWidth} animate__animated animate__fadeIn`}>
                <input
                    className={Styles.inputPesquisaNavbar}
                    type='text'
                    placeholder={`Busque por ${efeitoTypewriter__wrapper}`}
                    onFocus={() => handleEnter()}
                    onBlur={() => handleLeave()}
                    onChange={(e) => setTxtFiltro(e.target.value)}
                    onKeyPress={handleKeyPress}
                />

                <div className={Styles.lupa} title='Buscar' onClick={() => handleBuscar()}>
                    <Lupa width='1.5rem' cor='var(--preto)' />
                </div>
            </div>
        </Fragment>
    )
}