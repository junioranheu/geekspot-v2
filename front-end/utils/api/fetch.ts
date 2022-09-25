import Router from 'next/router';
import nProgress from 'nprogress';
import CONSTS_AUTENTICAR from '../../utils/consts/data/constAutenticar';
import CONSTS_SISTEMA from '../consts/outros/sistema';
import { Auth } from '../context/usuarioContext';
import { Aviso } from '../outros/aviso';
import horarioBrasilia from '../outros/horarioBrasilia';

export const Fetch = {
    async getApi(url: string, isTentarRefreshToken: boolean = true) {
        const token = Auth?.get()?.token ?? '';
        let respostaJson;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            let resposta = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            // console.log(resposta);

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição GET ao servidor!', 5000);

            // Se o usuário tem um token e foi erro 401, chame o end-point de refresh token;
            respostaJson = await Fetch.refreshToken(token, erro.message, 'GET', url, null, isTentarRefreshToken);
        }

        return respostaJson;
    },

    async postApi(url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        const token = Auth?.get()?.token ?? '';
        let respostaJson;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            let resposta = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'body': body,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição POST ao servidor!', 5000);

            // Se o usuário tem um token e foi erro 401, chame o end-point de refresh token;
            respostaJson = await Fetch.refreshToken(token, erro.message, 'POST', url, body, isTentarRefreshToken);
        }

        return respostaJson;
    },

    async putApi(url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        const token = Auth?.get()?.token ?? '';
        let respostaJson;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            let resposta = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            });

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'body': body,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição POST ao servidor!', 5000);

            // Se o usuário tem um token e foi erro 401, chame o end-point de refresh token;
            respostaJson = await Fetch.refreshToken(token, erro.message, 'PUT', url, body, isTentarRefreshToken);
        }

        return respostaJson;
    },

    async refreshToken(token: string, erro: any, tipo: string, url: string | null, body: string | null, isTentarRefreshToken: boolean): Promise<any> {
        if (token && erro === 'Unexpected end of JSON input' && isTentarRefreshToken) {
            const urlRefreshToken = CONSTS_AUTENTICAR.API_URL_POST_REFRESH_TOKEN;
            const dto = {
                token: token,
                refreshToken: (Auth?.get()?.refreshToken ?? '')
            };

            // Fazer requisição para o end-point de refresh token
            const respostaRefreshToken = await Fetch.postApi(urlRefreshToken, dto);
            if (!respostaRefreshToken || respostaRefreshToken?.erro) {
                console.log(respostaRefreshToken?.mensagemErro ?? 'Houve um erro ao gerar o refresh token');
                return false;
            }

            // Atualizar dados no local storage;
            const dadosUsuario = {
                token: respostaRefreshToken.token,
                refreshToken: respostaRefreshToken.refreshToken
            };

            Auth.update(dadosUsuario);

            if (process.env.NODE_ENV === 'development') {
                console.log('Refresh token atualizado');
                Aviso.success('Refresh token atualizado', 5000);
            }

            // Tentar novamente a chamada para o end-point requisitado, mas agora com o novo token;
            let respostaJson;

            if (url) {
                try {
                    if (tipo === 'GET') {
                        respostaJson = await Fetch.getApi(url, false);
                    } else if (tipo === 'POST') {
                        respostaJson = await Fetch.postApi(url, body, false);
                    } else if (tipo === 'PUT') {
                        respostaJson = await Fetch.putApi(url, body, false);
                    }
                } catch (error) {
                    nProgress.start();
                    Aviso.custom(`A sua sessão expirou!<br/><br/>Renove sua sessão fazendo login novamente no ${CONSTS_SISTEMA.NOME_SISTEMA} 😎`, 15000);

                    // Deslogar;
                    Auth.delete();
                    Router.push('/usuario/entrar');
                    nProgress.done();

                    location.reload();
                    return false;
                }
            }

            return respostaJson;
        }
    }
}