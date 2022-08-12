import Lottie from 'lottie-react';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import SessaoEntrar from '../../components/usuario/entrar';
import Styles from '../../styles/entrar.module.scss';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import LottieAnimacao from '../../utils/lotties/um.json';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function Entrar() {
    document.title = 'GeekSpot — Entrar';

    const usuarioContext = useContext(UsuarioContext);// Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const [isPrimeiroLoading, setIsPrimeiroLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Criar variável para que o Router.push abaixo não bugue;
        // Se for o primeiro loading, permita o push acontecer, já que o usuário estaria entrando na tela por querer, mesmo estando logado;
        setIsPrimeiroLoading(false);

        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    if (isAuth && isPrimeiroLoading) {
        Router.push({ pathname: '/404', query: { msg: 'autenticado' } });
        return false;
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <div className={Styles.flexEntrar}>
            <SessaoEntrar />

            <div className={Styles.divLottie}>
                <Lottie animationData={LottieAnimacao} loop={true} />
            </div>
        </div>
    )
}