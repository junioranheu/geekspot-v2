export default interface iItemTipo {
    itemTipoId: number;
    tipo: string;
    descricao: string | null;
    isNovoTipo: number;
    isAtivo: boolean;
    dataRegistro: Date;
    
    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}

