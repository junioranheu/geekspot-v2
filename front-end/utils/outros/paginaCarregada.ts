import nProgress from 'nprogress';
import { Dispatch } from 'react';
import gerarNumeroAleatorio from './gerarNumeroAleatorio';

export default function paginaCarregada(isMostrarNProgress: boolean, segMin: number, segMax: number, setIsLoaded: Dispatch<boolean>) {
    if (isMostrarNProgress) {
        nProgress.start();
    }

    setTimeout(function () {
        setIsLoaded(true);

        if (isMostrarNProgress) {
            nProgress.done();
        }
    }, gerarNumeroAleatorio(segMin, segMax));
}