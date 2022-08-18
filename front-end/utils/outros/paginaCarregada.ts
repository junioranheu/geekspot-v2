import NProgress from 'nprogress';
import { Dispatch } from 'react';
import gerarNumeroAleatorio from './gerarNumeroAleatorio';

export default function paginaCarregada(isMostrarNProgress: boolean, segMin: number, segMax: number, setIsLoaded: Dispatch<boolean>) {
    if (isMostrarNProgress) {
        NProgress.start();
    }

    setTimeout(function () {
        setIsLoaded(true);

        if (isMostrarNProgress) {
            NProgress.done();
        }
    }, gerarNumeroAleatorio(segMin, segMax));
}