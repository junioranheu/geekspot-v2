import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import SessaoEsquerda from '../../components/entrar/entrar.sessaoEsquerda.js';
import Styles from '../../styles/entrar.module.css';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import paginaCarregada from '../../utils/outros/paginaCarregada.js';

export default function Entrar() {
    document.title = 'GeekSpot — Entrar';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

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
        <section className={Styles.wrapper}>
            <SessaoEsquerda />
        </section>
    )
}