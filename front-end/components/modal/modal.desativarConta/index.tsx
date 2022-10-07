import nProgress from 'nprogress';
import { Dispatch, Fragment, KeyboardEvent, useContext, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../utils/consts/data/constUsuarios';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import { Aviso } from '../../../utils/outros/aviso';
import deslogar from '../../../utils/outros/deslogar';
import Botao from '../../outros/botao';
import { FecharModal } from '../fecharModal';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
}

export default function ModalDesativarConta({ handleModal }: iParametros) {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refSenha = useRef<any>(null);
    const refBtn = useRef<any>(null);
    const [senha, setSenha] = useState('');

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    async function handleDesativarConta() {
        if (!isAuth) {
            Aviso.error('Parece que você não está autenticado. Como chegou até aqui?', 5000);
            return false;
        }

        if (!senha) {
            Aviso.warn('O campo de <b>senha</b> está vazio', 5000);
            refSenha && refSenha.current?.select();
            FecharModal.fecharModalClicandoNoBotao(handleModal);
            return false;
        }

        nProgress.start();
        const url = CONSTS_USUARIOS.API_URL_PUT_DESATIVAR_CONTA;
        const dto = {
            senha: senha
        };

        const resposta = await Fetch.putApi(url, dto);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            Aviso.error((resposta?.mensagemErro ?? 'Houve um problema ao desativar sua conta. Tente novamente mais tarde'), 5000);
            FecharModal.fecharModalClicandoNoBotao(handleModal);
            return false;
        }

        nProgress.done();
        FecharModal.fecharModalClicandoNoBotao(handleModal);
        deslogar(setIsAuth);
    }

    return (
        <Fragment>
            <ReactTooltip multiline={true} />

            <div className={Styles.main}>
                <span className={Styles.titulo}>Preencha o campo abaixo com sua senha atual para desativar sua conta</span>

                <div className={`${Styles.div100} margem1`}>
                    <input
                        className='input'
                        type='password'
                        placeholder='Senha'
                        autoComplete='new-password'
                        onChange={(e) => setSenha(e.target.value)}
                        onKeyPress={handleKeyPress}
                        ref={refSenha}
                    />
                </div>

                <div className={`${Styles.botaoCustom} margem0_5`} onClick={handleDesativarConta} data-tip='Cuidado com esse botão!'>
                    <Botao texto='Desativar conta' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={refBtn} isEnabled={true} />
                </div>

                <span className='separadorHorizontal'></span>

                <div className={Styles.div100}>
                    <span className={Styles.textoPequeno}>Não se esqueça: ao desativar sua conta, é <b className='cor-principal'>IMPOSSÍVEL</b> reativá-la depois. Pense bem antes de confirmar, ein?</span>
                </div>
            </div>
        </Fragment>
    )
}