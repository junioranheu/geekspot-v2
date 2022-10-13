import iAjudaTopico from './ajuda.topico';

export default interface iAjudaItem {
    ajudaItemId: number;
    titulo: string;

    ajudaTopicoId: number;
    ajudasTopicos: iAjudaTopico;

    conteudoHtml: string;
    isAtivo: boolean;
    dataRegistro: Date;

    erro: boolean;
    codigoErro: number;
    mensagemErro: string | null;
}


