import { KeyboardEvent, useContext, useState } from 'react';
import Lupa from '../../../components/svg/lupa';
import { ModoDarkContext } from '../../../utils/context/modoDarkContext';
import Styles from '../index.module.scss';

export default function AjudaInputPesquisaTopico() {

    const modoDarkContext = useContext(ModoDarkContext); // Contexto do modo dark;
    const [isModoDark, setIsModoDark] = [modoDarkContext?.isModoDarkContext[0], modoDarkContext?.isModoDarkContext[1]];

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
        <div className={`${Styles.divPesquisa} margem3`}>
            <input
                className={Styles.inputPesquisaNavbar}
                type='text'
                placeholder='Procure por um tópico'
                onChange={(e) => setTxtFiltro(e.target.value)}
                onKeyPress={handleKeyPress}
            />

            <div className={Styles.lupa} title='Buscar tópico' onClick={() => handleBuscar()}>
                <Lupa width={20} url={null} title={null} isCorPrincipal={(isModoDark ?? false)} />
            </div>
        </div>
    )
}

