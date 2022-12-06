import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, KeyboardEvent, useContext, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip'; // https://www.npmjs.com/package/react-tooltip
import ModalAvisoLogin from '../../../components/modal/modal.aviso/login';
import ModalRecuperarSenha from '../../../components/modal/modal.recuperarSenha';
import ModalLayout from '../../../components/modal/_modal.layout';
import ModalWrapper from '../../../components/modal/_modal.wrapper';
import Botao from '../../../components/outros/botao';
import Facebook from '../../../components/svg/facebook';
import Google from '../../../components/svg/google';
import Styles from '../../../styles/usuario.autenticar.module.scss';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_AUTENTICAR from '../../../utils/consts/data/constAutenticar';
import CONSTS_MODAL from '../../../utils/consts/outros/modal.tamanho';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import { Aviso } from '../../../utils/outros/aviso';
import consultarGeneroPorNomePessoa from '../../../utils/outros/consultarGeneroPorNomePessoa';
import pegarPrimeiraPalavraDaFrase from '../../../utils/outros/pegarPrimeiraPalavraDaFrase';
import iContextDadosUsuario from '../../../utils/types/context.dadosUsuario';
import iUsuario from '../../../utils/types/usuario';

interface iFormData {
    usuario: string;
    senha: string;
}

export default function SessaoEntrar() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refUsuario = useRef<any>(null);
    const refSenha = useRef<any>(null);
    const refBtn = useRef<any>(null);

    const [isExibirDivEmail, setIsExibirDivEmail] = useState<boolean>(false);

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState<iFormData>({ usuario: '', senha: '' });
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Ao clicar no botão para entrar;
    async function handleSubmit() {
        setModalAvisoLoginDescricao('');
        setIsModalAvisoLoginOpen(false);
        nProgress.start();
        refBtn.current.disabled = true;

        if (!formData || !formData.usuario || !formData.senha) {
            instrucaoErro('O nome de usuário e/ou e-mail estão vazios!', true);
            return false;
        }

        const url = CONSTS_AUTENTICAR.API_URL_POST_LOGIN;
        const dto = {
            email: formData.usuario,
            nomeUsuarioSistema: formData.usuario,
            senha: formData.senha
        };

        const resposta = await Fetch.postApi(url, dto) as iUsuario;
        if (!resposta || resposta?.erro) {
            setModalAvisoLoginDescricao((resposta?.mensagemErro ? `Parece que ${resposta?.mensagemErro.toLowerCase()}. Tente novamente mais tarde` : 'Algo deu errado! Provavelmente o usuário e/ou a senha estão errados'));
            setIsModalAvisoLoginOpen(true);
            instrucaoErro('', false);
            return false;
        }

        // Voltar à tela principal;
        Router.push('/').then(() => {
            // Inserir o token no json final para gravar localmente a sessão do login;
            resposta.genero = consultarGeneroPorNomePessoa(pegarPrimeiraPalavraDaFrase(resposta?.nomeCompleto));
            resposta.cep = resposta?.usuariosInformacoes?.cep ?? '';
            Auth.set(resposta as unknown as iContextDadosUsuario);

            // Atribuir autenticação ao contexto de usuário;
            setIsAuth(true);
        });
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    function instrucaoErro(msg: string, isExibirAviso: boolean) {
        nProgress.done();
        refSenha.current.value = '';
        formData.senha = '';
        refUsuario.current.select();
        refBtn.current.disabled = false;

        if (isExibirAviso) {
            Aviso.warn(msg, 5000);
        }
    }

    const [modalAvisoLoginDescricao, setModalAvisoLoginDescricao] = useState<string>('');
    const [isModalAvisoLoginOpen, setIsModalAvisoLoginOpen] = useState<boolean>(false);
    const [isModalEsqueciSenhaOpen, setIsModalEsqueciSenhaOpen] = useState<boolean>(false);

    return (
        <Fragment>
            {/* Modal de aviso de login */}
            <ModalWrapper isOpen={isModalAvisoLoginOpen}>
                <ModalLayout handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)} isExibirApenasLogo={true} titulo='Entre agora mesmo' tamanho={CONSTS_MODAL.PEQUENO} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalAvisoLogin
                        handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)}
                        titulo={null}
                        descricao={modalAvisoLoginDescricao}
                        isExibirBotao={false}
                        textoBotao={null}
                        urlBotao={null}
                        isNovaAba={null}
                    />
                </ModalLayout>
            </ModalWrapper>

            {/* Modal de recuperação de senha */}
            <ModalWrapper isOpen={isModalEsqueciSenhaOpen}>
                <ModalLayout handleModal={() => setIsModalEsqueciSenhaOpen(!isModalEsqueciSenhaOpen)} isExibirApenasLogo={true} titulo='Recuperar senha' tamanho={CONSTS_MODAL.PEQUENO} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalRecuperarSenha handleModal={() => setIsModalEsqueciSenhaOpen(!isModalEsqueciSenhaOpen)} />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <section className={Styles.divPrincipal}>
                <ReactTooltip multiline={true} />
                <span className={Styles.titulo}>Bem-vindo ao {CONSTS_SISTEMA.NOME_SISTEMA}</span>

                {/* Inputs */}
                <div className={Styles.divLogin}>
                    {
                        isExibirDivEmail ? (
                            <div className='animate__animated animate__fadeIn'>
                                <input className='input' type='text' placeholder='E-mail ou nome de usuário' autoComplete='off'
                                    name='usuario' onChange={handleChange} ref={refUsuario} onKeyPress={handleKeyPress}
                                />

                                <input className='input margem0_5' type='password' placeholder='Senha' autoComplete='new-password'
                                    name='senha' onChange={handleChange} ref={refSenha} onKeyPress={handleKeyPress}
                                />

                                <div className={`${Styles.botaoCustom} margem0_5`}>
                                    <Botao texto='Entrar' url={null} isNovaAba={false} handleFuncao={handleSubmit} Svg={null} refBtn={refBtn} isEnabled={true} />
                                </div>

                                <div className={`${Styles.divOpcoesFlex} margem0_5`}>
                                    <span></span>

                                    <span
                                        className='cor-principal pointer'
                                        data-tip='Caso tenha se esquecido da sua senha, clica aqui que a gente dá um help! 🖖'
                                        onClick={() => setIsModalEsqueciSenhaOpen(true)}
                                    >
                                        Esqueci minha senha
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className={Styles.botaoCustom}>
                                <Botao texto='Entrar com e-mail ou usuário' url={null} isNovaAba={false} handleFuncao={() => setIsExibirDivEmail(true)} Svg={null} refBtn={null} isEnabled={true} />
                            </div>
                        )
                    }
                </div>

                {/* Ou #1 */}
                <div>
                    <div className={Styles.divisao}>ou</div>
                    <div className={`${Styles.botaoCustom2} margem1`}>
                        <Botao texto='Continuar com o Facebook' url='/' isNovaAba={false} handleFuncao={null} Svg={<Facebook width='25px' />} refBtn={null} isEnabled={true} />
                    </div>

                    <div className={`${Styles.botaoCustom2} margem0_5`}>
                        <Botao texto='Continuar com o Google' url='/' isNovaAba={false} handleFuncao={null} Svg={<Google width='18px' />} refBtn={null} isEnabled={true} />
                    </div>
                </div>

                {/* Ou #2 */}
                <div>
                    <div className={Styles.divisao}>ou, não tem uma conta ainda?</div>
                    <div className={`${Styles.botaoCustom2} margem1`}>
                        <Botao texto='Criar uma conta' url='/usuario/criar-conta' isNovaAba={false} handleFuncao={null} Svg={null} refBtn={null} isEnabled={true} />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}