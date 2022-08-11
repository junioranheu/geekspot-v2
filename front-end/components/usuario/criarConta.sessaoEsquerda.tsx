import Link from 'next/link';
import NProgress from 'nprogress';
import { useContext, useRef, useState } from 'react';
import Styles from '../../styles/entrar.module.scss';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_AUTENTICAR from '../../utils/data/constAutenticar';
import { Aviso } from '../../utils/outros/aviso';
import { Fetch } from '../../utils/outros/fetch';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';
import padronizarNomeCompletoUsuario from '../../utils/outros/padronizarNomeCompletoUsuario';
import verificarDadosCriarConta from '../../utils/outros/verificarDadosCriarConta';
import Botao from '../outros/botao';
import Facebook from '../svg/facebook';
import GeekSpot from '../svg/geekspot';
import Google from '../svg/google';

interface iFormData {
    nomeCompleto: string,
    email: string;
    nomeUsuarioSistema: string;
    senha: string;
    confirmarSenha: string;
}

export default function SessaoEsquerda() {
    const usuarioContext = useContext(UsuarioContext);// Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refNomeCompleto = useRef<any>(null);
    const refEmail = useRef<any>(null);
    const refNomeUsuario = useRef<any>(null);
    const refSenha = useRef<any>(null);
    const refConfirmarSenha = useRef<any>(null);
    const refBtnCriar = useRef<any>(null);

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState<iFormData>({ nomeCompleto: '', email: '', nomeUsuarioSistema: '', senha: '', confirmarSenha: '' });
    function handleChange(e: any) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para entrar;
    async function handleSubmit(e: any) {
        NProgress.start();
        refBtnCriar.current.disabled = true;
        e.preventDefault();

        // Verificações;
        const isTrocouSenha = true;
        let isContinuarUm = verificarDadosCriarConta(formData, refNomeCompleto, refEmail, refNomeUsuario, refSenha, refConfirmarSenha, isTrocouSenha);
        if (!isContinuarUm) {
            refBtnCriar.current.disabled = false;
            return false;
        }

        // Atribuir o nome formatado para a variavel nome, novamente;
        formData.nomeCompleto = padronizarNomeCompletoUsuario(formData.nomeCompleto);

        // Criar conta;
        const urlCriarConta = CONSTANTS_AUTENTICAR.API_URL_POST_REGISTRAR;
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

        
       // await getToken(formData.nomeUsuarioSistema, formData.senha, formData.nomeCompleto);
    };

    // async function getToken(nomeUsuarioSistema: string, senha: string, nomeCompleto: string) {
    //     const urlDados = `${CONSTANTS_USUARIOS.API_URL_GET_VERIFICAR_EMAIL_E_SENHA}?nomeUsuarioSistema=${nomeUsuarioSistema}&senha=${senha}`;
    //     let dadosUsuarioVerificado = await Fetch.getApi(urlDados, null);

    //     // Gerar token;
    //     const urlAutenticar = `${CONSTANTS_USUARIOS.API_URL_GET_AUTENTICAR}?nomeUsuarioSistema=${nomeUsuarioSistema}&senha=${senha}`;
    //     let resposta = await Fetch.getApi(urlAutenticar, null);

    //     if (!resposta) {
    //         Aviso.error('Algo deu errado ao se autenticar!', 5000);
    //         return false;
    //     }

    //     // Inserir o token no json final para gravar localmente a sessão do login;
    //     dadosUsuarioVerificado.token = resposta;
    //     dadosUsuarioVerificado.genero = consultarGeneroPorNomePessoa(pegarPrimeiraPalavraDaFrase(nomeCompleto));
    //     Auth.set(dadosUsuarioVerificado);

    //     // Enviar e-mail de "bem-vindo";
    //     // const isEmailEnviado = await enviarEmail(email, nomeCompleto);
    //     // if (!isEmailEnviado) {
    //     //     Aviso.error('Houve um erro ao disparar um e-mail para você! Tente logar no sistema novamente mais tarde', 5000);
    //     //     return false;
    //     // }

    //     // Aviso.success('Um e-mail de verificação de conta foi enviado para você!', 7000);

    //     // Voltar à tela principal;
    //     Router.push('/');

    //     // Atribuir autenticação ao contexto de usuário;
    //     setIsAuth(true);
    //     NProgress.done();
    // }

    // async function enviarEmail(email: string, nomeCompleto: string) {
    //     // Gerar uma url temporária;
    //     const urlTipo = 'Verificar conta';
    //     const jsonGerarUrlTemporaria = {
    //         chaveDinamica: email,
    //         dataGeracaoUrl: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
    //         isAtivo: 1
    //     };
    //     const urlGerarUrlTemporaria = `${CONSTANTS_URL_TEMPORARIA.API_URL_POST_CRIAR}?urlTipo=${urlTipo}`;
    //     let urlTemporaria = await Fetch.postApi(urlGerarUrlTemporaria, jsonGerarUrlTemporaria, null);
    //     if (!urlTemporaria) {
    //         // Aviso.error('Houve um erro ao gerar uma url temporária!', 5000);
    //         return false;
    //     }

    //     // Disparar e-mail;
    //     const urlEnviarEmail = `${CONSTANTS.API_URL_POST_ENVIAR_EMAIL_BEM_VINDO}?email=${email}&nomeUsuario=${nomeCompleto}&urlTemporaria=${urlTemporaria}`;
    //     const enviarEmail = await Fetch.postApi(urlEnviarEmail, null, null);
    //     if (!enviarEmail) {
    //         // Aviso.error('Houve um erro ao disparar um e-mail para você!', 5000);
    //         return false;
    //     }

    //     return true;
    // }

    function handleKeyPress(e: any) {
        if (e.key === 'Enter') {
            refBtnCriar.current.click();
        }
    }

    function handleKeyPressNaoPermitirEspaco(e: any) {
        e.target.value = e.target.value.replace(' ', '');
    }

    return (
        <section className={Styles.divPrincipal}>
            <GeekSpot width='0.9rem' cor='var(--branco)' />
            <span className={Styles.titulo}>Crie sua conta no GeekSpot</span>

            {/* Inputs */}
            <div>
                <div>
                    <input className='input' type='text' placeholder='Nome completo' name='nomeCompleto'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refNomeCompleto}
                    />
                </div>

                <div className='margem0_5'>
                    <input className='input' type='email' placeholder='E-mail' name='email'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refEmail}
                    />
                </div>

                <div className='margem0_5'>
                    <input className='input' type='text' placeholder='Nome de usuário' name='nomeUsuarioSistema'
                        onChange={(e) => (handleChange(e), handleKeyPressNaoPermitirEspaco(e))} onKeyPress={handleKeyPress} ref={refNomeUsuario}
                    />
                </div>

                <div className='margem0_5'>
                    <input className='input' type='password' placeholder='Senha' autoComplete='new-password' name='senha'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refSenha}
                    />
                </div>

                <div className='margem0_5'>
                    <input className='input' type='password' placeholder='Confirme sua senha' name='confirmarSenha'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refConfirmarSenha}
                    />
                </div>

                {/* <div className={`${Styles.checkbox} $'margem0_5'`}>
                    <input type='checkbox' />
                    <label>Concordo com os termos de uso</label>
                </div> */}

                <div className={`${Styles.botaoCustom} margem0_5`} onClick={handleSubmit} >
                    <Botao texto={'Criar conta'} url={''} isNovaAba={false} Svg='' refBtn={refBtnCriar} isEnabled={true} />
                </div>
            </div>

            {/* Ou #1 */}
            <div>
                <div className={Styles.divisao}>ou</div>
                <div className={`${Styles.botaoCustom2} margem1`}>
                    <Botao texto='&nbsp;&nbsp;&nbsp;Criar conta com o Facebook' url={'/'} isNovaAba={false} Svg={<Facebook width={'25px'} />} refBtn={null} isEnabled={true} />
                </div>

                <div className={`${Styles.botaoCustom2} margem0_5`}>
                    <Botao texto='&nbsp;&nbsp;&nbsp;Criar conta com o Google' url={'/'} isNovaAba={false} Svg={<Google width={'18px'} />} refBtn={null} isEnabled={true} />
                </div>
            </div>

            {/* Ou #2 */}
            <div>
                <div className={Styles.divisao}>ou</div>
                <div className='margem1'>
                    <span className={Styles.subtitulo}>
                        Já tem uma conta? <Link href='/usuario/entrar'><a className={'cor-principal'}>Entre aqui</a></Link>
                    </span>
                </div>
            </div>
        </section>
    )
}