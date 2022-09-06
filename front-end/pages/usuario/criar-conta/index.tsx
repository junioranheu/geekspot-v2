import Lottie from 'lottie-react';
import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Styles from '../../../styles/usuario.autenticar.module.scss';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import LottieAnimacao from '../../../utils/lotties/pessoas.json';
import paginaCarregada from '../../../utils/outros/paginaCarregada';
import SessaoCriarConta from './sessaoCriarConta';

export default function CriarConta() {
    document.title = `Criar conta — ${CONSTS_SISTEMA.NOME_SISTEMA}`;
    
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
            <div className={Styles.divLottie}>
                <Lottie animationData={LottieAnimacao} loop={true} />
            </div>

            <SessaoCriarConta />
        </div>
    )
}