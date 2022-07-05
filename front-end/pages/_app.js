import 'animate.css/animate.min.css';
import { useRouter } from 'next/router';
import 'nprogress/nprogress.css';
import { Fragment, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../fonts/GTWalsheim.css';
import '../fonts/NanumPenScript.css';
import LayoutPadrao from '../layouts/padrao.js';
import '../styles/globals.css';
import { ModoDarkProvider } from '../utils/context/modoDarkContext';
import { UsuarioProvider } from '../utils/context/usuarioContext';

export default function App({ Component, pageProps }) {
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
                <ModoDarkProvider>
                    <UsuarioProvider>
                        {/* Toaster de aviso */}
                        <ToastContainer className='semHighlight' />

                        {/* Conteúdo */}
                        {verificarLayout()}
                    </UsuarioProvider>
                </ModoDarkProvider>
            </Fragment>
        ) : null
}

