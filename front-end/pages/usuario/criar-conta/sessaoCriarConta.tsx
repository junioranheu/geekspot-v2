import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip'; // https://www.npmjs.com/package/react-tooltip
import Botao from '../../../components/outros/botao';
import Ajuda from '../../../components/svg/ajuda';
import Facebook from '../../../components/svg/facebook';
import Google from '../../../components/svg/google';
import Styles from '../../../styles/usuario.autenticar.module.scss';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_AUTENTICAR from '../../../utils/consts/data/constAutenticar';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import { Aviso } from '../../../utils/outros/aviso';
import consultarGeneroPorNomePessoa from '../../../utils/outros/consultarGeneroPorNomePessoa';
import converterSrcImagemParaBase64 from '../../../utils/outros/converterSrcImagemParaBase64';
import gerarImagemPerfilRandom from '../../../utils/outros/gerarImagemPerfilRandom';
import horarioBrasilia from '../../../utils/outros/horarioBrasilia';
import padronizarNomeCompletoUsuario from '../../../utils/outros/padronizarNomeCompletoUsuario';
import pegarPrimeiraPalavraDaFrase from '../../../utils/outros/pegarPrimeiraPalavraDaFrase';
import validarDadosCriarConta from '../../../utils/outros/validarDadosCriarConta';
import iContextDadosUsuario from '../../../utils/types/context.dadosUsuario';
import iUsuario from '../../../utils/types/usuario';

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

    const [isExibirDivEmail, setIsExibirDivEmail] = useState<boolean>(false);

    const msgRequisitosSenha = `A sua senha deve conter ao menos:
    <br />1 número;
    <br />1 letra maiúscula;
    <br />8 caracteres;
    <br />E não deve conter seu primeiro nome, nome de usuário ou e-mail 👽`;

    const msgTermos = `Ao criar uma conta,<br/>você está de acordo com os termos de serviço<br/>e a política de privacidade do ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState<iFormData>({ nomeCompleto: '', email: '', nomeUsuarioSistema: '', senha: '', confirmarSenha: '' });
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Gerar uma foto de perfil aleatória em Base64;
    const [imagemPerfilRandomInicialBase64, setImagemPerfilRandomInicialBase64] = useState<File>();
    useEffect(() => {
        converterSrcImagemParaBase64(gerarImagemPerfilRandom()?.src)
            .then((base64: any) => {
                // console.log(base64);
                setImagemPerfilRandomInicialBase64(base64)
            });
    }, [])

    // Ao clicar no botão para criar conta;
    async function handleSubmit() {
        nProgress.start();
        refBtnCriar.current.disabled = true;

        // Verificações;
        const isTrocouSenha = true;
        let isContinuarUm = validarDadosCriarConta(formData, refNomeCompleto, refEmail, refNomeUsuario, refSenha, refConfirmarSenha, isTrocouSenha);
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
            foto: imagemPerfilRandomInicialBase64,
            isAtivo: true,
            isPremium: false,
            IsVerificado: false
        };

        const resposta = await Fetch.postApi(url, dto) as iUsuario;
        if (!resposta || resposta?.erro) {
            nProgress.done();
            refEmail.current.select();
            refSenha.current.value = '';
            refConfirmarSenha.current.value = '';
            formData.senha = '';
            refBtnCriar.current.disabled = false;
            Aviso.error((resposta?.mensagemErro ?? 'Parece que ocorreu um erro interno. Tente novamente mais tarde'), 10000);
            return false;
        }

        // Voltar à tela principal;
        Router.push('/').then(() => {
            resposta.genero = consultarGeneroPorNomePessoa(pegarPrimeiraPalavraDaFrase(resposta?.nomeCompleto));
            resposta.cep = '';
            Auth.set(resposta as unknown as iContextDadosUsuario);

            if (resposta.isEmailVerificacaoContaEnviado) {
                Aviso.success('Um e-mail de verificação de conta foi enviado para você 👽', 7000);
            }

            // Atribuir autenticação ao contexto de usuário;
            setIsAuth(true);
            nProgress.done();
        });
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtnCriar.current.click();
        }
    }

    function handleKeyPressNaoPermitirEspaco(e: ChangeEvent<HTMLInputElement>) {
        e.target.value = e.target.value.replace(' ', '');
    }

    return (
        <section className={Styles.divPrincipal}>
            <span className={Styles.titulo}>Crie sua conta no {CONSTS_SISTEMA.NOME_SISTEMA}</span>

            {/* Inputs */}
            {
                isExibirDivEmail ? (
                    <Fragment>
                        <ReactTooltip multiline={true} />

                        <div className='animate__animated animate__fadeIn'>
                            <div>
                                <input className='input' type='text' placeholder='Nome completo' name='nomeCompleto' autoComplete='nope1'
                                    onChange={handleChange} onKeyPress={handleKeyPress} ref={refNomeCompleto}
                                />
                            </div>

                            <div className='margem0_5'>
                                <input className='input' type='email' placeholder='Seu melhor e-mail' name='email' autoComplete='nope2'
                                    onChange={handleChange} onKeyPress={handleKeyPress} ref={refEmail}
                                />
                            </div>

                            <div className='margem0_5'>
                                <input className='input' type='text' placeholder='Nome de usuário' name='nomeUsuarioSistema'
                                    onChange={(e) => (handleChange(e), handleKeyPressNaoPermitirEspaco(e))} onKeyPress={handleKeyPress} ref={refNomeUsuario}
                                />
                            </div>

                            <div className={`margem0_5 ${Styles.flexEspecial}`}>
                                <input className='input' type='password' placeholder='Senha' name='senha' autoComplete='new-password'
                                    onChange={handleChange} onKeyPress={handleKeyPress} ref={refSenha}
                                />

                                <div data-tip={msgRequisitosSenha}>
                                    <Ajuda width={24} url={null} title={null} isCorPrincipal={false} />
                                </div>
                            </div>

                            <div className='margem0_5'>
                                <input className='input' type='password' placeholder='Confirme sua senha' name='confirmarSenha'
                                    onChange={handleChange} onKeyPress={handleKeyPress} ref={refConfirmarSenha}
                                />
                            </div>

                            <div className={`${Styles.botaoCustom} margem0_5`} onClick={handleSubmit} data-tip={msgTermos}>
                                <Botao texto='Criar conta' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={refBtnCriar} isEnabled={true} />
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <div className={Styles.botaoCustom}>
                        <Botao texto='Criar conta com e-mail' url={null} isNovaAba={false} handleFuncao={() => setIsExibirDivEmail(true)} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                )
            }

            {/* Ou #1 */}
            {
                !isExibirDivEmail && (
                    <div>
                        <div className={Styles.divisao}>ou</div>
                        <div className={`${Styles.botaoCustom2} margem1`}>
                            <Botao texto='Criar conta com o Facebook' url='/' isNovaAba={false} handleFuncao={() => null} Svg={<Facebook width={'25px'} />} refBtn={null} isEnabled={true} />
                        </div>

                        <div className={`${Styles.botaoCustom2} margem0_5`}>
                            <Botao texto='Criar conta com o Google' url='/' isNovaAba={false} handleFuncao={() => null} Svg={<Google width={'18px'} />} refBtn={null} isEnabled={true} />
                        </div>
                    </div>
                )
            }

            {/* Ou #2 */}
            <div>
                <div className={Styles.divisao}>ou, já tem uma conta?</div>
                <div className={`${Styles.botaoCustom2} margem1`}>
                    <Botao texto='Entrar agora' url='/usuario/entrar' isNovaAba={false} handleFuncao={null} Svg={null} refBtn={null} isEnabled={true} />
                </div>
            </div>
        </section >
    )
}