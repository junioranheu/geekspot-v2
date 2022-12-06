import Router from 'next/router';
import { KeyboardEvent, useContext, useState } from 'react';
import Lupa from '../../../components/svg/lupa';
import { ModoDarkContext } from '../../../utils/context/modoDarkContext';
import { Aviso } from '../../../utils/outros/aviso';
import Styles from '../index.module.scss';

interface iParametros {
    topicoBuscado: string | null;
}

export default function AjudaInputPesquisaTopico({ topicoBuscado }: iParametros) {

    const modoDarkContext = useContext(ModoDarkContext); // Contexto do modo dark;
    const [isModoDark, setIsModoDark] = [modoDarkContext?.isModoDarkContext[0], modoDarkContext?.isModoDarkContext[1]];

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleBuscar();
        }
    }

    const [txtFiltro, setTxtFiltro] = useState<string>(topicoBuscado ?? '');
    function handleBuscar() {
        if (!txtFiltro) {
            Aviso.warn('Parece que você não escreveu nada no <b>campo de busca</b>', 5000);
            return false;
        }

        Router.push({ pathname: '/ajuda/busca', query: { query: txtFiltro } });
    }

    return (
        <div className={`${Styles.divPesquisa} margem3`}>
            <input
                className={Styles.inputPesquisaNavbar}
                type='text'
                placeholder='Procure por um tópico como "trocas" ou "compras", por exemplo'
                onChange={(e) => setTxtFiltro(e.target.value)}
                onKeyPress={handleKeyPress}
                value={txtFiltro}
            />

            <div className={Styles.lupa} title='Buscar tópico' onClick={() => handleBuscar()}>
                <Lupa width={20} url={null} title={null} isCorPrincipal={(isModoDark ?? false)} />
            </div>
        </div>
    )
}

