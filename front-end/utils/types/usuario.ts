import { StaticImageData } from 'next/image';
import iUsuarioInformacoes from './usuarioInformacoes';
import iUsuarioTipo from './usuarioTipo';

export default interface iUsuario {
    usuarioId: null;
    nomeCompleto: string;
    email: string;
    nomeUsuarioSistema: string;
    token: string | null;
    usuarioTipoId: number;
    usuariosTipos: iUsuarioTipo;
    foto: string | null;
    dataRegistro: Date | null;
    dataOnline: Date | null;
    isAtivo: boolean;
    isPremium: boolean | null;
    isVerificado: boolean | null;
    isDesativado: boolean | null;
    usuariosInformacoes: iUsuarioInformacoes;
    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;

    // Propriedades extra que não estão na entidade Usuario que são usadas no front-end apenas;
    genero: string | null;
    fotoPerfilAlternativa: StaticImageData | null;
    cep: string | null;
    isEmailVerificacaoContaEnviado: boolean | null;
}

