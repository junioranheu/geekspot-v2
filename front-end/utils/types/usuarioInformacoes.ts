export default interface iUsuarioInformacoes {
    usuarioInformacaoId: number;
    usuarioId: number;
    dataAniversario: Date | null;
    cpf: string | null;
    telefone: string | null;
    cep: string | null;
    estado: string | null;
    cidade: string | null;
    bairro: string | null;
    rua: string | null;
    numeroResidencia: string | null;
    referenciaLocal: string | null;
    lojinhaTitulo: string | null;
    lojinhaDescricao: string | null;
    lojinhaImagemCapa: string | null;
    lojinhaQtdEstrelas: number | null;
    dataUltimaAlteracao: Date | null;

    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}

