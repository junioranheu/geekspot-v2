import Router, { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../utils/consts/data/constUsuarios';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { Aviso } from '../../../utils/outros/aviso';
import paginaCarregada from '../../../utils/outros/paginaCarregada';

export default function RecuperarSenha() {
    document.title = `Recuperar senha — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const router = useRouter();
    const { hash } = router.query;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    // http://localhost:3000/usuario/recuperar-senha/PaXHA2zjU2DRjwnSM6Z0XxfeoIAQgMB60gCuf+GtpQw=
    // É necessário verificar se o codigo ainda é valido no back-end

    async function handleAlterarSenha() {
        nProgress.start();
        const url = `${CONSTS_USUARIOS.API_URL_PUT_VERIFICAR_CONTA}/${hash}`;
        const resposta = await Fetch.putApi(url, null);

        if (!resposta || resposta?.erro) {
            nProgress.done();

            Aviso.error((resposta?.mensagemErro ?? 'Parece que ocorreu um erro interno. Tente novamente mais tarde'), 10000);
            Router.push({ pathname: '/404', query: { erro: CONSTS_ERROS.HASH_INVALIDA } });
            return false;
        }

        nProgress.done();
        paginaCarregada(true, 200, 500, setIsLoaded);
        Router.push('/');
        Aviso.error('Senha alterada com sucesso 👽', 7000);
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao animate__animated animate__fadeIn animate__slow'>
            <div className='centralizarTexto'>
                <span className='cor-preto'>Aguarde um momento, estamos verificando sua conta... {hash} 👽</span>
            </div>
        </section>
    )
}
