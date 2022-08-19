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
import { ModoDarkProvider } from '../utils/context/modoDarkContext';
import { UsuarioProvider } from '../utils/context/usuarioContext';

export default function App({ Component, pageProps }: any) {
    const { asPath } = useRouter();

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

    return url ?
        (
            <Fragment>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta name='description' content='GeekSpot — Um upgrade ao seu inventário' />
                    <meta name='keywords' content='geek, produtos, compra, troca, venda, e-commerce' />
                    <meta name='author' content='@junioranheu' />
                    <meta name='theme-color' content='#9a6bff' />
                </Head>

                <ModoDarkProvider>
                    <UsuarioProvider>
                        {/* Toaster de aviso */}
                        <ToastContainer className='semHighlight' />

                        {/* Conteúdo */}
                        {verificarLayout()}

                        {/* Consentimento de cookies */}
                        <ModalCookieConsent />
                    </UsuarioProvider>
                </ModoDarkProvider>
            </Fragment>
        ) : null
}

