import Router, { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import TopHat from '../../../components/outros/topHat';
import TopHatSecundario from '../../../components/outros/topHat.secundario';
import Configuracao from '../../../components/svg/configuracao';
import useBackgroundBege from '../../../hooks/outros/useBackgroundBege';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../utils/consts/data/constUsuarios';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { Aviso } from '../../../utils/outros/aviso';
import paginaCarregada from '../../../utils/outros/paginaCarregada';
import Styles from './index.module.scss';

interface iFormRecuperarSenha {
    senhaNova: string | null;
    senhaNovaConfirmacao: string | null;
}

export default function RecuperarSenha() {
    
    document.title = `Recuperar senha — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const router = useRouter();
    const { hash } = router.query;
    useBackgroundBege();

    const refSenhaNova = useRef<any>(null);
    const refSenhaConfirmacao = useRef<any>(null);
    const refBtn = useRef<any>(null);

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    const [formDataRecuperarSenha, setFormDataRecuperarSenha] = useState<iFormRecuperarSenha>({
        senhaNova: '',
        senhaNovaConfirmacao: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataRecuperarSenha({ ...formDataRecuperarSenha, [e.target.name]: e.target.value });
    }

    async function handleAlterarSenha() {
        if (!formDataRecuperarSenha.senhaNova) {
            Aviso.warn('O campo de <b>nova senha</b> está vazio', 5000);
            refSenhaNova && refSenhaNova.current?.select();
            return false;
        }

        if (!formDataRecuperarSenha.senhaNovaConfirmacao) {
            Aviso.warn('O campo de <b>confirmação de senha</b> está vazio', 5000);
            refSenhaConfirmacao && refSenhaConfirmacao.current?.select();
            return false;
        }

        nProgress.start();
        const url = CONSTS_USUARIOS.API_URL_PUT_ATUALIZAR_SENHA_RECUPERAR;
        const dto = {
            hash: hash,
            senhaNova: formDataRecuperarSenha.senhaNova,
            senhaNovaConfirmacao: formDataRecuperarSenha.senhaNovaConfirmacao
        };

        const resposta = await Fetch.putApi(url, dto);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            Aviso.error((resposta?.mensagemErro ?? 'Parece que ocorreu um erro interno. Tente novamente mais tarde'), 10000);
            return false;
        }

        nProgress.done();
        Router.push('/usuario/entrar');
        Aviso.success('Senha alterada com sucesso 👽', 7000);
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao'>
            <TopHat Svg={<Configuracao width={22} url={null} title={null} isCorPrincipal={false} />} titulo='Recuperação de senha' />

            <div className={`${Styles.main} margem1`}>
                <TopHatSecundario titulo='Preencha os campos abaixo com sua nova senha e, então, confirme-a 🖖' />

                {/* <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <span className={Styles.item}>Hash</span>
                    <input disabled={true} readOnly={true} className='input' type='text' value={hash} />
                </div> */}

                <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <span className={Styles.item}>Nova senha</span>
                    <input className='input' type='password' autoComplete='new-password' name='senhaNova' onChange={handleChange} value={formDataRecuperarSenha.senhaNova?.toString()} ref={refSenhaNova} onKeyPress={handleKeyPress} />
                </div>

                <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <span className={Styles.item}>Confirmar senha</span>
                    <input className='input' type='password' autoComplete='new-password' name='senhaNovaConfirmacao' onChange={handleChange} value={formDataRecuperarSenha.senhaNovaConfirmacao?.toString()} ref={refSenhaConfirmacao} onKeyPress={handleKeyPress} />
                </div>

                <span className='separadorHorizontal'></span>
                <div className='divBotaoInvertido'>
                    <Botao texto='Resetar senha' url={null} isNovaAba={false} handleFuncao={() => handleAlterarSenha()} Svg={null} refBtn={refBtn} isEnabled={true} />
                </div>
            </div>
        </section>
    )
}
