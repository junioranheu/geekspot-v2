import { createContext, useState } from 'react';
import horarioBrasilia from '../outros/horarioBrasilia';

interface iContext {
    isAuthContext: [isAuth: boolean, setIsAuth: any];
}

export const UsuarioContext = createContext<iContext | null>(null);

export const UsuarioProvider = (props: any) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('auth') !== null ? true : false);

    return (
        <UsuarioContext.Provider value={{
            isAuthContext: [isAuth, setIsAuth],
        }}>
            {props.children}
        </UsuarioContext.Provider>
    );
}

export const Auth = {
    set(data: any) {
        const dadosUsuario = {
            usuarioId: data.usuarioId,
            nome: data.nomeCompleto,
            nomeUsuarioSistema: data.nomeUsuarioSistema,
            email: data.email,
            usuarioTipoId: data.usuarioTipoId,
            foto: data.foto,
            isVerificado: data.isVerificado,
            token: data.token,
            dataAutenticacao: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            genero: data.genero
        };

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem('auth', parsedData);
    },

    get() {
        let data = localStorage.getItem('auth');

        if (!data) {
            return null;
        }

        let dataJson = JSON.parse(data);
        return dataJson;
    },

    delete() {
        localStorage.removeItem('auth');
    },

    update(data: any) {
        const dadosUsuario = {
            usuarioId: (data.usuarioId ?? Auth.get().usuarioId),
            nome: (data.usuarioId ?? Auth.get().nome),
            nomeUsuarioSistema: (data.usuarioId ?? Auth.get().nomeUsuarioSistema),
            email: (data.usuarioId ?? Auth.get().email),
            usuarioTipoId: (data.usuarioId ?? Auth.get().usuarioTipoId),
            foto: (data.usuarioId ?? Auth.get().foto),
            isVerificado: (data.usuarioId ?? Auth.get().isVerificado),
            token: (data.usuarioId ?? Auth.get().token),
            dataAutenticacao: (data.usuarioId ?? Auth.get().dataAutenticacao),
            genero: (data.usuarioId ?? Auth.get().genero)
        };

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem('auth', parsedData);
    }
}