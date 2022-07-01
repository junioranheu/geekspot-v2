import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Padrao({ Component, pageProps }) {
    const router = useRouter();
    // const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;

    // // Verificar se o token ainda é válido;
    // useEffect(() => {
    //     if (isAuth) {
    //         const horaAgora = horarioBrasilia();
    //         const dataAutenticacao = Auth.getUsuarioLogado()?.dataAutenticacao;
    //         var diferencaHoras = diferencaEmHoras(horaAgora, dataAutenticacao);
    //         // console.log(diferencaHoras);

    //         // Foi definido na API, no método ServicoGerarToken() em Services/TokenService.cs, que o token JWT expira em 1 mês;
    //         // Simular um comportamento parecido aqui... caso a diferença seja de xxx horas, limpe o token e mostre uma mensagem ao usuário;
    //         const limiteExpirarTokenHoras = 24;
    //         if (diferencaHoras >= limiteExpirarTokenHoras) {
    //             NProgress.start();
    //             Aviso.custom('A sua sessão expirou!<br/><br/>Renove sua sessão fazendo login novamente no Anheu 😎', 15000);

    //             // Desatribuir autenticação ao contexto de usuário;
    //             setIsAuth(false);

    //             // Deslogar;
    //             Auth.deleteUsuarioLogado();
    //             Router.push({ pathname: '/' });
    //             NProgress.done();
    //         }
    //     }
    // }, [isAuth]);

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
            {/* <Navbar1 />
            <Navbar2 /> */}

            <section className='sessaoPrincipal'>
                <section className={`${efeitoAnimar}`}>
                    <Component {...pageProps} />
                </section>
            </section>

            {/* <Footer /> */}
        </section>
    )
}