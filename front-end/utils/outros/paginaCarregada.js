import NProgress from 'nprogress';
import numeroAleatorio from './numeroAleatorio';

export default function paginaCarregada(isMostrarNProgress, segMin, segMax, setIsLoaded) {
    if (isMostrarNProgress) {
        NProgress.start();
    }

    setTimeout(function () {
        setIsLoaded(true);

        if (isMostrarNProgress) {
            NProgress.done();
        }
    }, numeroAleatorio(segMin, segMax));
}