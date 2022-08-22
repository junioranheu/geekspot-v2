import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { useContext, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Facebook from '../../../components/svg/facebook';
import Google from '../../../components/svg/google';
import Logo from '../../../components/svg/logo';
import Styles from '../../../styles/usuario.autenticar.module.scss';
import CONSTS_SISTEMA from '../../../utils/consts/sistema';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTS_AUTENTICAR from '../../../utils/data/constAutenticar';
import { Aviso } from '../../../utils/outros/aviso';
import consultarGeneroPorNomePessoa from '../../../utils/outros/consultarGeneroPorNomePessoa';
import { Fetch } from '../../../utils/outros/fetch';
import horarioBrasilia from '../../../utils/outros/horarioBrasilia';
import padronizarNomeCompletoUsuario from '../../../utils/outros/padronizarNomeCompletoUsuario';
import pegarPrimeiraPalavraDaFrase from '../../../utils/outros/pegarPrimeiraPalavraDaFrase';
import verificarDadosCriarConta from '../../../utils/outros/verificarDadosCriarConta';

interface iFormData {
    nomeCompleto: string,
    email: string;
    nomeUsuarioSistema: string;
    senha: string;
    confirmarSenha: string;
}

export default function SessaoCriarConta() {
    const usuarioContext = useContext(UsuarioContext);// Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refNomeCompleto = useRef<any>(null);
    const refEmail = useRef<any>(null);
    const refNomeUsuario = useRef<any>(null);
    const refSenha = useRef<any>(null);
    const refConfirmarSenha = useRef<any>(null);
    const refBtnCriar = useRef<any>(null);

    const [isExibirDivEmail, setIsExibirDivEmail] = useState(false);

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
        nProgress.start();
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
        const url = CONSTS_AUTENTICAR.API_URL_POST_REGISTRAR;
        const dto = {
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

        const resposta = await Fetch.postApi(url, dto, null);

        if (resposta?.erro) {
            nProgress.done();
            refEmail.current.select();
            refSenha.current.value = '';
            refConfirmarSenha.current.value = '';
            formData.senha = '';
            refBtnCriar.current.disabled = false;
            Aviso.error(resposta.mensagem, 10000);
            return false;
        }

        resposta.genero = consultarGeneroPorNomePessoa(pegarPrimeiraPalavraDaFrase(resposta?.nomeCompleto));
        Auth.set(resposta);

        // Enviar e-mail de "bem-vindo";
        // const isEmailEnviado = await enviarEmail(email, nomeCompleto);
        // if (!isEmailEnviado) {
        //     Aviso.error('Houve um erro ao disparar um e-mail para você! Tente logar no sistema novamente mais tarde', 5000);
        //     return false;
        // }

        // Aviso.success('Um e-mail de verificação de conta foi enviado para você!', 7000);

        // Voltar à tela principal;
        Router.push('/');

        // Atribuir autenticação ao contexto de usuário;
        setIsAuth(true);
        nProgress.done();
    };

    // async function enviarEmail(email: string, nomeCompleto: string) {
    //     // Gerar uma url temporária;
    //     const urlTipo = 'Verificar conta';
    //     const jsonGerarUrlTemporaria = {
    //         chaveDinamica: email,
    //         dataGeracaoUrl: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
    //         isAtivo: 1
    //     };
    //     const urlGerarUrlTemporaria = `${CONSTS_URL_TEMPORARIA.API_URL_POST_CRIAR}?urlTipo=${urlTipo}`;
    //     let urlTemporaria = await Fetch.postApi(urlGerarUrlTemporaria, jsonGerarUrlTemporaria, null);
    //     if (!urlTemporaria) {
    //         // Aviso.error('Houve um erro ao gerar uma url temporária!', 5000);
    //         return false;
    //     }

    //     // Disparar e-mail;
    //     const urlEnviarEmail = `${CONSTS.API_URL_POST_ENVIAR_EMAIL_BEM_VINDO}?email=${email}&nomeUsuario=${nomeCompleto}&urlTemporaria=${urlTemporaria}`;
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
            <Logo width='0.9rem' cor='var(--branco)' />
            <span className={Styles.titulo}>Crie sua conta no {CONSTS_SISTEMA.NOME_SISTEMA}</span>

            {/* Inputs */}
            {
                isExibirDivEmail ? (
                    <div className='animate__animated animate__fadeIn'>
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

                        <div className={`${Styles.botaoCustom} margem0_5`} onClick={handleSubmit} >
                            <Botao texto='Criar conta' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={refBtnCriar} isEnabled={true} />
                        </div>
                    </div>
                ) : (
                    <div className={Styles.botaoCustom}>
                        <Botao texto='Criar conta com e-mail' url={null} isNovaAba={false} handleFuncao={() => setIsExibirDivEmail(true)} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                )
            }

            {/* Ou #1 */}
            <div>
                <div className={Styles.divisao}>ou</div>
                <div className={`${Styles.botaoCustom2} margem1`}>
                    <Botao texto='Criar conta com o Facebook' url='/' isNovaAba={false} handleFuncao={() => null} Svg={<Facebook width={'25px'} />} refBtn={null} isEnabled={true} />
                </div>

                <div className={`${Styles.botaoCustom2} margem0_5`}>
                    <Botao texto='Criar conta com o Google' url='/' isNovaAba={false} handleFuncao={() => null} Svg={<Google width={'18px'} />} refBtn={null} isEnabled={true} />
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