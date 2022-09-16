export default interface iEstado {
    estadoId: number;
    nome: string;
    sigla: string;
    isAtivo: number;
    erro: boolean;
    codigoErro: number;
    mensagemErro: string | null;
}
