import Router from 'next/router';
import nProgress from 'nprogress';
import CONSTS_SISTEMA from '../consts/outros/sistema';
import TOKEN from '../consts/outros/token';
import { Auth } from '../context/usuarioContext';
import { Aviso } from './aviso';
import diferencaDatasEmHoras from './diferencaDatasEmHoras';
import horarioBrasilia from './horarioBrasilia';

export default function verificarTokenValido(isAuth: boolean | undefined, setIsAuth: any) {
    if (isAuth) {
        const horaAgora = horarioBrasilia().format('YYYY-MM-DD HH:mm:ss');
        const dataAutenticacao = Auth.get()?.dataAutenticacao;
        var diferencaHoras = diferencaDatasEmHoras(horaAgora, dataAutenticacao);

        // console.log('horaAgora:', horaAgora);
        // console.log('dataAutenticacao:', dataAutenticacao);
        // console.log('diferencaHoras:', diferencaHoras);

        if (diferencaHoras >= TOKEN.LIMITE_EXPIRAR_TOKEN_HORAS) {
            nProgress.start();
            Aviso.custom(`A sua sessão expirou!<br/><br/>Renove sua sessão fazendo login novamente no ${CONSTS_SISTEMA.NOME_SISTEMA} 😎`, 15000);

            // Desatribuir autenticação ao contexto de usuário;
            setIsAuth(false);

            // Deslogar;
            Auth.delete();
            Router.push({ pathname: '/' });
            nProgress.done();
        }
    }
}