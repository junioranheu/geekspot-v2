import 'animate.css/animate.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'nprogress/nprogress.css';
import { Fragment, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalCookieConsent from '../components/outros/modalCookieConsent';
import '../fonts/GTWalsheim/GTWalsheim.css';
import '../fonts/NanumPenScript/NanumPenScript.css';
import LayoutPadrao from '../layouts/padrao';
import '../styles/globals.scss';
import CONSTS_SISTEMA from '../utils/consts/outros/sistema';
import { ModoDarkProvider } from '../utils/context/modoDarkContext';
import { UsuarioProvider } from '../utils/context/usuarioContext';

export default function App({ Component, pageProps }: any) {
    const { asPath } = useRouter();
    const router = useRouter();

    const [url, setUrl] = useState('');
    useEffect(() => {
        // Setar url no Hook, para usar em verificarLayout();
        setUrl(asPath);
    }, [asPath]);

    function verificarLayout() {
        // console.log(`Url: ${url}`);

        // if (url.includes('/disciplinas') || url.includes('/usuario/meus-cursos')) {
        //     return <LayoutDisciplinas Component={Component} pageProps={pageProps} />
        // } if (url.includes('/posts')) {
        //     return <LayoutPosts Component={Component} pageProps={pageProps} />
        // } else {
        //     return <LayoutPadrao Component={Component} pageProps={pageProps} />
        // }

        return <LayoutPadrao Component={Component} pageProps={pageProps} />
    }

    // Scrollar pro top automaticamente;
    useEffect(() => {
        // console.log('useEffect fired!', {asPath: router.asPath});
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, [router.asPath]);

    return url ?
        (
            <Fragment>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta name='description' content={`${CONSTS_SISTEMA.NOME_SISTEMA} — ${CONSTS_SISTEMA.SLOGAN}`} />
                    <meta name='keywords' content='geek, produtos, compra, troca, venda, e-commerce' />
                    <meta name='author' content='@junioranheu' />
                    <meta name='theme-color' content='#9a6bff' />
                </Head>

                {/* <Script src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5929346454358482' /> */}

                <ModoDarkProvider>
                    <UsuarioProvider>
                        {/* Toaster de aviso */}
                        <ToastContainer className='semHighlight' />

                        {/* Conteúdo */}
                        {verificarLayout()}

                        {/* Consentimento de cookies */}
                        <ModalCookieConsent />

                        {/* Elemento para os modais */}
                        <div id='modalWrapper'></div>
                    </UsuarioProvider>
                </ModoDarkProvider>
            </Fragment>
        ) : null
}

