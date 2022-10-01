import Router from 'next/router';
import nProgress from 'nprogress';
import { Dispatch } from 'react';
import { Auth } from '../context/usuarioContext';
import desabilitarTodosElementos from './desabilitarTodosElementos';

export default function deslogar(setIsAuth: Dispatch<boolean>) {
    nProgress.start();
    desabilitarTodosElementos(false);

    Router.push('/').then(() => {
        Auth.delete();
        setIsAuth(false);
        nProgress.done();
        // Aviso.custom('Até a proxima! Tchau 🖖', 5000);
    });
}