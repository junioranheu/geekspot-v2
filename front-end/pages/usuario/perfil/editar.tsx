import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../utils/consts/data/constUsuarios';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { Auth } from '../../../utils/context/usuarioContext';
import { Aviso } from '../../../utils/outros/aviso';
import paginaCarregada from '../../../utils/outros/paginaCarregada';
import iUsuario from '../../../utils/types/usuario';

export default function Configuracoes() {

    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [usuario, setUsuario] = useState<iUsuario>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        document.title = `Configurações — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

        async function getUsuario(usuarioId: number) {
            const url = `${CONSTS_USUARIOS.API_URL_GET_BY_ID}/${usuarioId}`;
            const resposta = await Fetch.getApi(url, null) as iUsuario;
            const usuario = resposta;
            console.log(usuario);

            if (!usuario || usuario?.erro) {
                nProgress.done();
                Aviso.warn('xxx', 5000);
                return false;
            }

            paginaCarregada(true, 200, 500, setIsLoaded);
        }

        if (usuarioId) {
            nProgress.start();
            getUsuario(usuarioId.toString());
            nProgress.done();
        }
    }, [usuarioId]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem3'>
            <div className='centralizarTexto'>
                <span className='titulo'>Configfuções</span>
            </div>

            <div className='margem2'>
                Teste
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

