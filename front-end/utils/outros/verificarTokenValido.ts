import moment from 'moment';
import Router from 'next/router';
import nProgress from 'nprogress';
import CONSTS_SISTEMA from '../consts/outros/sistema';
import { Auth } from '../context/usuarioContext';
import { Aviso } from './aviso';
import diferencaDatasEmHoras from './diferencaDatasEmHoras';
import horarioBrasilia from './horarioBrasilia';

export default function verificarTokenValido(isAuth: boolean | undefined, setIsAuth: any) {
    if (isAuth) {
        const token = Auth?.get()?.token ?? '';
        const dataExpiracaoToken = moment(getJWTExpireDate(token));
        const horaAgora = moment(horarioBrasilia());

        if (process.env.NODE_ENV === 'development') {
            try {
                const info = {
                    'Data atual': horaAgora.format('YYYY-MM-DD HH:mm:ss'),
                    'Data de expiração do token': dataExpiracaoToken.format('YYYY-MM-DD HH:mm:ss'),
                    'Horas faltantes': diferencaDatasEmHoras(dataExpiracaoToken, horaAgora)
                }

                console.table(info);
            } catch (error) {

            }
        }

        if (horaAgora > dataExpiracaoToken) {
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

// https://stackoverflow.com/a/67802771
function getJWTExpireDate(jwtToken: string) {
    if (jwtToken) {
        try {
            const [, payload] = jwtToken.split('.');
            const { exp: expires } = JSON.parse(window.atob(payload));

            if (typeof expires === 'number') {
                return new Date(expires * 1000);
            }
        } catch {
            
        }
    }

    return null;
}