import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Footer from '../components/footer/footer';
import NavbarMobile from '../components/navbar/mobile/navbar.mobile';
import NavbarSmall from '../components/navbar/outros/navbar.small';
import NavbarPadrao from '../components/navbar/padrao/navbar.padrao';
import useWindowSize from '../hooks/outros/useWindowSize';
import { Auth, UsuarioContext } from '../utils/context/usuarioContext';
import verificarTokenValido from '../utils/outros/verificarTokenValido';

export default function Padrao({ Component, pageProps }: any) {
    const router = useRouter();
    const tamanhoTela = useWindowSize();

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    // Verificar se o token ainda é válido;
    useEffect(() => {
        verificarTokenValido(isAuth, setIsAuth);
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
                    <NavbarPadrao auth={Auth} isAuth={isAuth} setIsAuth={setIsAuth} />
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