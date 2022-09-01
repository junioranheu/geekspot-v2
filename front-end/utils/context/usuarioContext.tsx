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
            genero: data.genero,
            fotoPerfilAlternativa: data.fotoPerfilAlternativa,
            cep: data.cep
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
            nome: (data.nome ?? Auth.get().nome),
            nomeUsuarioSistema: (data.nomeUsuarioSistema ?? Auth.get().nomeUsuarioSistema),
            email: (data.email ?? Auth.get().email),
            usuarioTipoId: (data.usuarioTipoId ?? Auth.get().usuarioTipoId),
            foto: (data.foto ?? Auth.get().foto),
            isVerificado: (data.isVerificado ?? Auth.get().isVerificado),
            token: (data.token ?? Auth.get().token),
            dataAutenticacao: (data.dataAutenticacao ?? Auth.get().dataAutenticacao),
            genero: (data.genero ?? Auth.get().genero),
            fotoPerfilAlternativa: (data.fotoPerfilAlternativa ?? Auth.get().fotoPerfilAlternativa),
            cep: (data.cep ?? Auth.get().cep)
        };

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem('auth', parsedData);
    }
}