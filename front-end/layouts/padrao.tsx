import Router, { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useContext, useEffect, useState } from 'react';
import Footer from '../components/footer/footer';
import NavbarMobile from '../components/navbar/navbar.mobile';
import NavbarPadraoDois from '../components/navbar/navbar.padrao';
import NavbarSmall from '../components/navbar/navbar.small';
import useWindowSize from '../hooks/useWindowSize';
import CONSTS_SISTEMA from '../utils/consts/sistema';
import { Auth, UsuarioContext } from '../utils/context/usuarioContext';
import { Aviso } from '../utils/outros/aviso';
import diferencaEmHoras from '../utils/outros/diferencaEmHoras';
import horarioBrasilia from '../utils/outros/horarioBrasilia';

export default function Padrao({ Component, pageProps }: any) {
    const router = useRouter();
    const tamanhoTela = useWindowSize();
   
    const usuarioContext = useContext(UsuarioContext);// Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    // Verificar se o token ainda é válido;
    useEffect(() => {
        if (isAuth) {
            const horaAgora = horarioBrasilia();
            const dataAutenticacao = Auth.get()?.dataAutenticacao;
            var diferencaHoras = diferencaEmHoras(horaAgora, dataAutenticacao);
            // console.log(diferencaHoras);

            // Foi definido na API, no método ServicoGerarToken() em Services/TokenService.cs, que o token JWT expira em 1 mês;
            // Simular um comportamento parecido aqui... caso a diferença seja de xxx horas, limpe o token e mostre uma mensagem ao usuário;
            const limiteExpirarTokenHoras = 24;
            if (diferencaHoras >= limiteExpirarTokenHoras) {
                nProgress.start();
                Aviso.custom(`A sua sessão expirou!<br/><br/>Renove sua sessão fazendo login novamente no ${CONSTS_SISTEMA.NOME_SISTEMA} 😎`, 15000);
   
                // Desatribuir autenticação ao contexto de usuário;
                setIsAuth(false);

                // Deslogar;
                Auth.delete();
                Router.push({ pathname: '/' });
                nProgress.done();
            }
        }
    }, [isAuth]);

    // Renovar animação a cada mudança de URL (router.asPath);
    const [efeitoAnimar, setEfeitoAnimar] = useState('');
    useEffect(() => {
        setEfeitoAnimar('animate__animated animate__fadeIn delay03');

        setTimeout(function () {
            setEfeitoAnimar('');
        }, 1000);
    }, [router.asPath]);

    return (
        <section className='main semHighlight'>
            <NavbarSmall />

            {
                tamanhoTela.width && tamanhoTela?.width >= 1025 ? (
                    <NavbarPadraoDois auth={Auth} isAuth={isAuth} setIsAuth={setIsAuth} />
                ) : (
                    <NavbarMobile auth={Auth} isAuth={isAuth} setIsAuth={setIsAuth} />
                )
            }

            <section className='sessaoPrincipal'>
                <section className={`${efeitoAnimar}`}>
                    <Component {...pageProps} />
                </section>
            </section>

            <Footer />
        </section>
    )
}