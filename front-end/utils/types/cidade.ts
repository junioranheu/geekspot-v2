import iEstado from './estado';

export default interface iCidade {
    cidadeId: number;
    nome: string;
    estadoId: number;
    estados: iEstado;
    erro: boolean;
    codigoErro: number;
    mensagemErro: string | null;
}


