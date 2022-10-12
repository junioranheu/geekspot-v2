export default interface iAjudaTopico {
    ajudaTopicoId: number;
    titulo: string;
    descricao:string;
    isAtivo: boolean;
    dataRegistro: Date;

    erro: boolean;
    codigoErro: number;
    mensagemErro: string | null;
}


