import nProgress from 'nprogress';
import { ChangeEvent, Dispatch, KeyboardEvent, useRef, useState } from 'react';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../utils/consts/data/constUsuarios';
import { Aviso } from '../../../utils/outros/aviso';
import Botao from '../../outros/botao';
import { FecharModal } from '../fecharModal';
import Styles from './index.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
}

interface iFormSenha {
    senhaAtual: string;
    senhaNova: string;
    senhaNovaConfirmacao: string;
}

export default function ModalAlterarSenha({ handleModal }: iParametros) {

    const refSenhaAtual = useRef<any>(null);
    const refSenhaNova = useRef<any>(null);
    const refSenhaNovaConfirmacao = useRef<any>(null);
    const refBtn = useRef<any>(null);

    const [formSenha, setFormSenha] = useState<iFormSenha>({
        senhaAtual:  '',
        senhaNova:  '',
        senhaNovaConfirmacao: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormSenha({ ...formSenha, [e?.target?.name]: e?.target?.value });
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    async function handleAlterarSenha() {
        if (!formSenha.senhaAtual) {
            Aviso.warn('O campo de <b>senha atual</b> está vazio', 5000);
            refSenhaAtual && refSenhaAtual.current?.select();
            return false;
        }

        if (!formSenha.senhaNova) {
            Aviso.warn('O campo de <b>nova senha</b> está vazio', 5000);
            refSenhaNova && refSenhaNova.current?.select();
            return false;
        }

        if (!formSenha.senhaNovaConfirmacao) {
            Aviso.warn('O campo de <b>confirmação da nova senha</b> está vazio', 5000);
            refSenhaNovaConfirmacao && refSenhaNovaConfirmacao.current?.select();
            return false;
        }

        nProgress.start();
        const url = CONSTS_USUARIOS.API_URL_PUT_ATUALIZAR_SENHA;
        const dto = {
            senhaAtual: formSenha.senhaAtual,
            senhaNova: formSenha.senhaNova,
            senhaNovaConfirmacao: formSenha.senhaNovaConfirmacao
        };

        const resposta = await Fetch.putApi(url, dto);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            Aviso.error((resposta?.mensagemErro ?? 'Houve um problema ao alterar sua senha. Tente novamente mais tarde'), 10000);
            FecharModal.fecharModalClicandoNoBotao(handleModal);
            return false;
        }

        nProgress.done();
        Aviso.success('<b>Senha</b> alterada com sucesso', 5000);
        FecharModal.fecharModalClicandoNoBotao(handleModal);
    }

    return (
        <div className={Styles.main}>
            <span className={Styles.titulo}>Preencha os campos abaixo para alterar sua senha</span>

            <div className={`${Styles.div100} margem1`}>
                <input
                    className='input'
                    type='password'
                    placeholder='Senha atual'
                    autoComplete='new-password'
                    name='senhaAtual'
                    value={formSenha.senhaAtual}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    ref={refSenhaAtual}
                />
            </div>

            <div className={`${Styles.div100} margem0_5`}>
                <input
                    className='input'
                    type='password'
                    placeholder='Nova senha'
                    autoComplete='new-password'
                    name='senhaNova'
                    value={formSenha.senhaNova}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    ref={refSenhaNova}
                />
            </div>

            <div className={`${Styles.div100} margem0_5`}>
                <input
                    className='input'
                    type='password'
                    placeholder='Confirme sua nova senha'
                    autoComplete='new-password'
                    name='senhaNovaConfirmacao'
                    value={formSenha.senhaNovaConfirmacao}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    ref={refSenhaNovaConfirmacao}
                />
            </div>

            <div className={`${Styles.botaoCustom} margem0_5`} onClick={handleAlterarSenha} data-tip='Cuidado com esse botão!'>
                <Botao texto='Alterar senha' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={refBtn} isEnabled={true} />
            </div>

            <span className='separadorHorizontal'></span>

            <div className={Styles.div100}>
                <span className={Styles.textoPequeno}>Anote sua nova senha em algum lugar para não esquecê-la, belê? 🫶</span>
            </div>
        </div>
    )
}