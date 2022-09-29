import Router from 'next/router';
import nProgress from 'nprogress';
import { Dispatch } from 'react';
import { Auth } from '../context/usuarioContext';
import numeroAleatorio from './gerarNumeroAleatorio';

export default function deslogar(setIsAuth: Dispatch<boolean>) {
    nProgress.start();
    Router.push('/').then(() => {
        setTimeout(function () {
            Auth.delete();
            setIsAuth(false);
            nProgress.done();
            // Aviso.custom('Até a proxima! Tchau 🖖', 5000);
        }, numeroAleatorio(1000, 2000));
    });
}