import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Footer from '../components/footer/footer';
import NavbarMobile from '../components/navbar/mobile/navbar.mobile';
import NavbarSmall from '../components/navbar/outros/navbar.small';
import NavbarPadrao from '../components/navbar/padrao/navbar.padrao';
import useWindowSize from '../hooks/outros/useWindowSize';
import verificarTokenValido from '../utils/api/verificarTokenValido';
import { UsuarioContext } from '../utils/context/usuarioContext';

export default function Padrao({ Component, pageProps }: any) {

    const { asPath } = useRouter();
    const tamanhoTela = useWindowSize();

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    // Verificar se o token ainda é válido;
    useEffect(() => {
        verificarTokenValido(isAuth);
    }, [isAuth]);

    // Renovar animação a cada mudança de URL (router.asPath);
    const [efeitoAnimar, setEfeitoAnimar] = useState<string>('');
    useEffect(() => {
        setEfeitoAnimar('animate__animated animate__fadeIn animate__delay03');

        setTimeout(function () {
            setEfeitoAnimar('');
        }, 1000);
    }, [asPath]);

    return (
        <section className='main semHighlight'>
            <NavbarSmall />

            {
                tamanhoTela.width && tamanhoTela?.width >= 1025 ? (
                    <NavbarPadrao />
                ) : (
                    <NavbarMobile />
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