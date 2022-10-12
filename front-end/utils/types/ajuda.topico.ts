export default interface iAjudaTopico {
    ajudaTopicoId: number;
    topico: string;
    descricao:string;
    isAtivo: boolean;
    dataRegistro: Date;

    erro: boolean;
    codigoErro: number;
    mensagemErro: string | null;
}


