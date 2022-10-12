export default interface iEstado {
    estadoId: number;
    nome: string;
    sigla: string;
    isAtivo: boolean;
    
    erro: boolean;
    codigoErro: number;
    mensagemErro: string | null;
}
