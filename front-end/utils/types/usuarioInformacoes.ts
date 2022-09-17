export default interface iUsuarioInformacoes {
    usuarioInformacaoId: number;
    usuarioId: number;
    dataAniversario: Date | null;
    cpf: string | null;
    telefone: string | null;
    cep: string | null;
    numeroResidencia: string | null;
    referenciaLocal: string | null;
    tituloLojinha: string | null;
    descricaoLojinha: string | null;
    qtdEstrelas: number | null;
    dataUltimaAlteracao: Date | null;
    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}

