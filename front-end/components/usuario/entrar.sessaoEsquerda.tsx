import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { useContext, useRef, useState } from 'react';
import Styles from '../../styles/entrar.module.scss';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS from '../../utils/data/constUsuarios';
import { Aviso } from '../../utils/outros/aviso';
import consultarGeneroPorNomePessoa from '../../utils/outros/consultarGeneroPorNomePessoa';
import pegarPrimeiraPalavraDaFrase from '../../utils/outros/pegarPrimeiraPalavraDaFrase';
import Botao from '../outros/botao';
import Facebook from '../svg/facebook';
import GeekSpot from '../svg/geekspot';
import Google from '../svg/google';

interface iFormData {
    usuario: string;
    senha: string;
}

export default function SessaoEsquerda() {
    const usuarioContext = useContext(UsuarioContext);// Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];
    const usuarioGenero = Auth?.get()?.genero ?? 'o';

    const refUsuario = useRef<any>(null);
    const refSenha = useRef<any>(null);
    const refBtn = useRef<any>(null);

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState<iFormData>({ usuario: '', senha: '' });
    function handleChange(e: any) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para entrar;
    async function handleSubmit(e: any) {
        nProgress.start();
        refBtn.current.disabled = true;
        e.preventDefault();

        if (!formData || !formData.usuario || !formData.senha) {
            nProgress.done();
            Aviso.warn('O nome de usuário e/ou e-mail estão vazios!', 5000);
            refSenha.current.value = '';
            refUsuario.current.select();
            refBtn.current.disabled = false;
            return false;
        }

        const url = `${CONSTANTS_USUARIOS.API_URL_GET_VERIFICAR_EMAIL_E_SENHA}?nomeUsuarioSistema=${formData.usuario}&senha=${formData.senha}`;
        // console.log(url);

        const resposta = await fetch(url);
        if (resposta.status !== 200) {
            nProgress.done();
            refSenha.current.value = '';
            formData.senha = '';
            refUsuario.current.select();
            refBtn.current.disabled = false;
            Aviso.warn('Algo deu errado<br/><br/>Provavelmente o usuário e/ou a senha estão errados!', 5000);
            return false;
        }

        // Resposta em JSON;
        const usuario = await resposta.json();

        // Gerar token e autenticar/entrar;
        getToken(formData.senha, usuario);
    };

    async function getToken(senha: string, usuario: any) {
        const url = `${CONSTANTS_USUARIOS.API_URL_GET_AUTENTICAR}?nomeUsuarioSistema=${usuario.nomeUsuarioSistema}&senha=${senha}`;
        // console.log(url);

        // Gerar token;
        const resposta = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (resposta.status !== 200) {
            Aviso.error('Algo deu errado ao se autenticar!', 5000);
            return false;
        }

        // Resposta em JSON;
        const token = await resposta.json();
        // console.log(respostaJson);

        // Inserir o token no json final para gravar localmente a sessão do login;
        usuario.token = token;
        usuario.genero = consultarGeneroPorNomePessoa(pegarPrimeiraPalavraDaFrase(usuario.nomeCompleto));
        Auth.set(usuario);

        // Atribuir autenticação ao contexto de usuário;
        setIsAuth(true);

        // Voltar à tela principal;
        Router.push('/');
        nProgress.done();
    }

    function handleKeyPress(e: any) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    return (
        <section className={Styles.divPrincipal}>
            <GeekSpot width='0.9rem' cor='var(--branco)' />
            <span className={Styles.titulo}>Bem-vind{usuarioGenero} ao GeekSpot</span>

            {/* Inputs */}
            <div className={Styles.divLogin}>
                <input className={`input`} type='text' placeholder='E-mail ou nome de usuário'
                    name='usuario' onChange={handleChange} ref={refUsuario} onKeyPress={handleKeyPress}
                />

                <input className={`input margem0_5`} type='password' placeholder='Senha'
                    name='senha' onChange={handleChange} ref={refSenha} onKeyPress={handleKeyPress}
                />

                <div className={`${Styles.botaoCustom} margem0_5`} onClick={handleSubmit}>
                    <Botao texto={'Entrar'} url={''} isNovaAba={false} Svg='' refBtn={refBtn} isEnabled={true} />
                </div>
            </div>

            {/* Ou #1 */}
            <div>
                <div className={Styles.divisao}>ou</div>
                <div className={`${Styles.botaoCustom2} margem1`}>
                    <Botao texto='&nbsp;&nbsp;&nbsp;Continuar com o Facebook' url={'/'} isNovaAba={false} Svg={<Facebook width='25px' />} refBtn={null} isEnabled={true} />
                </div>

                <div className={`${Styles.botaoCustom2} margem0_5`}>
                    <Botao texto='&nbsp;&nbsp;&nbsp;Continuar com o Google' url={'/'} isNovaAba={false} Svg={<Google width='18px' />} refBtn={null} isEnabled={true} />
                </div>
            </div>

            {/* Ou #2 */}
            <div>
                <div className={Styles.divisao}>ou</div>
                <div className='margem1'>
                    <span className={Styles.subtitulo}>
                        Não tem uma conta ainda? <Link href='/usuario/criar-conta'><a className={'cor-principal'}>Crie a sua aqui</a></Link>
                    </span>
                </div>
            </div>
        </section>
    )
}