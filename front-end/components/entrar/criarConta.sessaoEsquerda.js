import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useContext, useRef, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Botao from '../../components/outros/botao.js';
import Anheu from '../../components/svg/anheu';
import Styles from '../../styles/entrar.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS from '../../utils/data/constUsuarios';
import consultarGeneroPorNomePessoa from '../../utils/outros/consultarGeneroPorNomePessoa';
import { Fetch } from '../../utils/outros/fetch';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';
import PadronizarNomeCompletoUsuario from '../../utils/outros/padronizarNomeCompletoUsuario';
import pegarPrimeiraPalavraDaFrase from '../../utils/outros/pegarPrimeiraPalavraDaFrase';
import VerificarDadosCriarConta from '../../utils/outros/verificarDadosCriarConta';
import Facebook from '../svg/facebook.js';
import Google from '../svg/google.js';

export default function SessaoEsquerda() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;

    const refNomeCompleto = useRef();
    const refEmail = useRef();
    const refNomeUsuario = useRef();
    const refSenha = useRef();
    const refConfirmarSenha = useRef();
    const refBtnCriar = useRef();

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState(null);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para entrar;
    async function handleSubmit(e) {
        NProgress.start();
        refBtnCriar.current.disabled = true;
        e.preventDefault();

        // Verificações;
        const isTrocouSenha = true;
        let isContinuarUm = VerificarDadosCriarConta(formData, refNomeCompleto, refEmail, refNomeUsuario, refSenha, refConfirmarSenha, isTrocouSenha);
        if (!isContinuarUm) {
            refBtnCriar.current.disabled = false;
            return false;
        }

        // Atribuir o nome formatado para a variavel nome, novamente;
        formData.nomeCompleto = PadronizarNomeCompletoUsuario(formData.nomeCompleto);

        // Criar conta;
        const urlCriarConta = CONSTANTS_USUARIOS.API_URL_POST_CRIAR_CONTA_COM_VALIDACOES;
        const usuario_a_ser_criado = {
            nomeCompleto: formData.nomeCompleto,
            email: formData.email,
            nomeUsuarioSistema: formData.nomeUsuarioSistema,
            senha: formData.senha,
            usuarioTipoId: 2, // Usuário comum;
            dataCriacao: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            foto: '',
            isAtivo: 1,
            isPremium: 0,
            IsVerificado: 0
        };

        const resposta = await Fetch.postApi(urlCriarConta, usuario_a_ser_criado, null);
        if (!resposta) {
            NProgress.done();
            refEmail.current.select();
            refSenha.current.value = '';
            refConfirmarSenha.current.value = '';
            formData.senha = '';
            refBtnCriar.current.disabled = false;
            Aviso.error('Algo deu errado ao criar sua nova conta<br/><br/>Provavelmente outro usuário já está usando este e-mail e/ou nome de usuário!', 10000);
            return false;
        }

        await getToken(formData.nomeUsuarioSistema, formData.senha, formData.email, formData.nomeCompleto);
    };

    async function getToken(nomeUsuarioSistema, senha, email, nomeCompleto) {
        const urlDados = `${CONSTANTS_USUARIOS.API_URL_GET_VERIFICAR_EMAIL_E_SENHA}?nomeUsuarioSistema=${nomeUsuarioSistema}&senha=${senha}`;
        let dadosUsuarioVerificado = await Fetch.getApi(urlDados);

        // Gerar token;
        const urlAutenticar = `${CONSTANTS_USUARIOS.API_URL_GET_AUTENTICAR}?nomeUsuarioSistema=${nomeUsuarioSistema}&senha=${senha}`;
        let resposta = await Fetch.getApi(urlAutenticar);

        if (!resposta) {
            Aviso.error('Algo deu errado ao se autenticar!', 5000);
            return false;
        }

        // Inserir o token no json final para gravar localmente a sessão do login;
        dadosUsuarioVerificado.token = resposta;
        dadosUsuarioVerificado.genero = consultarGeneroPorNomePessoa(pegarPrimeiraPalavraDaFrase(nomeCompleto));
        Auth.setUsuarioLogado(dadosUsuarioVerificado);

        // Enviar e-mail de "bem-vindo";
        // const isEmailEnviado = await enviarEmail(email, nomeCompleto);
        // if (!isEmailEnviado) {
        //     Aviso.error('Houve um erro ao disparar um e-mail para você! Tente logar no sistema novamente mais tarde', 5000);
        //     return false;
        // }

        // Aviso.success('Um e-mail de verificação de conta foi enviado para você!', 7000);

        // Voltar à tela principal;
        Router.push('/disciplinas');

        // Atribuir autenticação ao contexto de usuário;
        setIsAuth(true);
        NProgress.done();
    }

    async function enviarEmail(email, nomeCompleto) {
        // Gerar uma url temporária;
        const urlTipo = 'Verificar conta';
        const jsonGerarUrlTemporaria = {
            chaveDinamica: email,
            dataGeracaoUrl: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            isAtivo: 1
        };
        const urlGerarUrlTemporaria = `${CONSTANTS_URL_TEMPORARIA.API_URL_POST_CRIAR}?urlTipo=${urlTipo}`;
        let urlTemporaria = await Fetch.postApi(urlGerarUrlTemporaria, jsonGerarUrlTemporaria, null);
        if (!urlTemporaria) {
            // Aviso.error('Houve um erro ao gerar uma url temporária!', 5000);
            return false;
        }

        // Disparar e-mail;
        const urlEnviarEmail = `${CONSTANTS.API_URL_POST_ENVIAR_EMAIL_BEM_VINDO}?email=${email}&nomeUsuario=${nomeCompleto}&urlTemporaria=${urlTemporaria}`;
        const enviarEmail = await Fetch.postApi(urlEnviarEmail, null, null);
        if (!enviarEmail) {
            // Aviso.error('Houve um erro ao disparar um e-mail para você!', 5000);
            return false;
        }

        return true;
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtnCriar.current.click();
        }
    }

    function handleKeyPressNaoPermitirEspaco(e) {
        e.target.value = e.target.value.replace(' ', '');
    }

    return (
        <section className={Styles.divEsquerda}>
            <Anheu width='0.9rem' cor='var(--branco)' />
            <span className={Styles.titulo}>Crie sua conta no Anheu</span>

            {/* Inputs */}
            <div>
                <div className={Styles.margemTopP}>
                    <input className='input' type='text' placeholder='Nome completo' name='nomeCompleto'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refNomeCompleto}
                    />
                </div>

                <div className={Styles.margemTopP}>
                    <input className='input' type='email' placeholder='E-mail' name='email'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refEmail}
                    />
                </div>

                <div className={Styles.margemTopP}>
                    <input className='input' type='text' placeholder='Nome de usuário' name='nomeUsuarioSistema'
                        onChange={(e) => (handleChange(e), handleKeyPressNaoPermitirEspaco(e))} onKeyPress={handleKeyPress} ref={refNomeUsuario}
                    />
                </div>

                <div className={Styles.margemTopP}>
                    <input className='input' type='password' placeholder='Senha' autoComplete='new-password' name='senha'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refSenha}
                    />
                </div>

                <div className={Styles.margemTopP}>
                    <input className='input' type='password' placeholder='Confirme sua senha' name='confirmarSenha'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refConfirmarSenha}
                    />
                </div>

                {/* <div className={`${Styles.checkbox} ${Styles.margemTopP}`}>
                    <input type='checkbox' />
                    <label>Concordo com os termos de uso</label>
                </div> */}

                <div className={`${Styles.botaoCustom} ${Styles.margemTopP}`} onClick={handleSubmit} >
                    <Botao texto={'Criar conta'} url={''} isNovaAba={false} Svg='' refBtn={refBtnCriar} isEnabled={true} />
                </div>
            </div>

            {/* Ou #1 */}
            <div>
                <div className={Styles.divisao}>ou</div>
                <div className={`${Styles.botaoCustom2} ${Styles.margemTopM}`}>
                    <Botao texto='&nbsp;&nbsp;&nbsp;Criar conta com o Facebook' url={'/'} isNovaAba={false} Svg={<Facebook width={'25px'} />} refBtn={null} isEnabled={true} />
                </div>

                <div className={`${Styles.botaoCustom2} ${Styles.margemTopP}`}>
                    <Botao texto='&nbsp;&nbsp;&nbsp;Criar conta com o Google' url={'/'} isNovaAba={false} Svg={<Google width={'18px'} />} refBtn={null} isEnabled={true} />
                </div>
            </div>

            {/* Ou #2 */}
            <div>
                <div className={Styles.divisao}>ou</div>
                <div className={Styles.margemTopM}>
                    <span className={Styles.subtitulo}>
                        Já tem uma conta? <Link href='/usuario/entrar'><a className={'cor-principal'}>Entre aqui</a></Link>
                    </span>
                </div>
            </div>
        </section>
    )
}