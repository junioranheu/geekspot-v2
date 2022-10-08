import Router, { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import TopHatSecundario from '../../../components/outros/topHat.secundario';
import useBackgroundBege from '../../../hooks/outros/useBackgroundBege';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../utils/consts/data/constUsuarios';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { Aviso } from '../../../utils/outros/aviso';
import paginaCarregada from '../../../utils/outros/paginaCarregada';
import Styles from './index.module.scss';

interface iFormRecuperarSenha {
    senha: string | null;
    senhaConfirmacacao: string | null;
}

export default function RecuperarSenha() {
    document.title = `Recuperar senha — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const router = useRouter();
    const { hash } = router.query;
    useBackgroundBege();

    const refBtn = useRef<any>(null);

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    const [formDataRecuperarSenha, setFormDataRecuperarSenha] = useState<iFormRecuperarSenha>({
        senha: '',
        senhaConfirmacacao: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataRecuperarSenha({ ...formDataRecuperarSenha, [e.target.name]: e.target.value });
    }

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
        <section className='flexColumn paddingPadrao'>
            <div className={Styles.main}>
                <TopHatSecundario titulo='Recuperar senha' />

                <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <span className={Styles.item}>Nova senha</span>
                    <input className='input' type='text' name='senha' onChange={handleChange} value={formDataRecuperarSenha.senha?.toString()} />
                </div>

                <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <span className={Styles.item}>Confirmar senha</span>
                    <input className='input' type='text' name='senhaConfirmacacao' onChange={handleChange} value={formDataRecuperarSenha.senhaConfirmacacao?.toString()} />
                </div>

                <span className='separadorHorizontal'></span>
                <div className='divBotaoInvertido'>
                    <Botao texto='Resetar senha' url={null} isNovaAba={false} handleFuncao={() => handleAlterarSenha()} Svg={null} refBtn={refBtn} isEnabled={true} />
                </div>
            </div>
        </section>
    )
}
