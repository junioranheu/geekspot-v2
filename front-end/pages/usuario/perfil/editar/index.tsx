import Router from 'next/router';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import useBackgroundBege from '../../../../hooks/outros/useBackgroundBege';
import { Fetch } from '../../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../../utils/consts/data/constUsuarios';
import CONSTS_ERROS from '../../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import { Auth } from '../../../../utils/context/usuarioContext';
import { Aviso } from '../../../../utils/outros/aviso';
import paginaCarregada from '../../../../utils/outros/paginaCarregada';
import iUsuario from '../../../../utils/types/usuario';
import Styles from './index.module.scss';
import SessaoDireita from './sessaoDireita';
import SessaoEsquerda from './sessaoEsquerda';

export default function Index() {

    document.title = `Configurações — ${CONSTS_SISTEMA.NOME_SISTEMA}`;
    const usuarioId = Auth?.get()?.usuarioId ?? 0;
    const isVerificado = Auth?.get()?.isVerificado ?? false;
    useBackgroundBege();

    const [arquivoUploadFotoPerfil, setArquivoUploadFotoPerfil] = useState('');
    const [arquivoUploadCapaLojinha, setArquivoUploadCapaLojinha] = useState('');

    const [usuario, setUsuario] = useState<iUsuario>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
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
    }, [usuarioId]);

    useEffect(() => {
        if (!isVerificado) {
            Aviso.warn('A sua <b>conta</b> ainda não foi verificada. Use o botão <b>reenviar e-mail de verificação de conta</b> no final da página para verificá-la 🖖', 10000);
        }
    }, [isVerificado]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao'>
            <div className={Styles.main}>
                <SessaoEsquerda
                    usuario={usuario}
                    arquivoUploadFotoPerfil={arquivoUploadFotoPerfil}
                    arquivoUploadCapaLojinha={arquivoUploadCapaLojinha}
                />

                <SessaoDireita
                    usuario={usuario}
                    arquivoUploadFotoPerfil={arquivoUploadFotoPerfil}
                    setArquivoUploadFotoPerfil={setArquivoUploadFotoPerfil}
                    arquivoUploadCapaLojinha={arquivoUploadCapaLojinha}
                    setArquivoUploadCapaLojinha={setArquivoUploadCapaLojinha}
                />
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

