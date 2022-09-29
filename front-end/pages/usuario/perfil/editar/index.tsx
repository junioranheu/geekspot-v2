import Router from 'next/router';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { Fetch } from '../../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../../utils/consts/data/constUsuarios';
import CONSTS_ERROS from '../../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import { Auth } from '../../../../utils/context/usuarioContext';
import paginaCarregada from '../../../../utils/outros/paginaCarregada';
import iUsuario from '../../../../utils/types/usuario';
import Styles from './index.module.scss';
import SessaoDireita from './sessaoDireita';
import SessaoEsquerda from './sessaoEsquerda';

export default function Index() {

    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [usuario, setUsuario] = useState<iUsuario>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        document.title = `Configurações — ${CONSTS_SISTEMA.NOME_SISTEMA}`;
        document.getElementsByTagName('body')[0]?.classList.add('backgroundBege');
        document.getElementsByClassName('sessaoPrincipal')[0]?.classList.add('backgroundBege');

        async function getUsuario(usuarioId: number) {
            const url = `${CONSTS_USUARIOS.API_URL_GET_BY_ID}/${usuarioId}`;
            const resposta = await Fetch.getApi(url) as iUsuario;

            setUsuario(resposta);
            paginaCarregada(true, 200, 500, setIsLoaded);
        }

        if (usuarioId) {
            nProgress.start();
            getUsuario(usuarioId.toString());
            nProgress.done();
        } else {
            Router.push({ pathname: '/404', query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        }

        // Detectar saída da tela;
        return () => {
            document.getElementsByTagName('body')[0]?.classList.remove('backgroundBege');
            document.getElementsByClassName('sessaoPrincipal')[0]?.classList.remove('backgroundBege');
        };
    }, [usuarioId]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem3'>
            <div className={Styles.main}>
                <SessaoEsquerda usuario={usuario} />
                <SessaoDireita usuario={usuario}/>
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

