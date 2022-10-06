export default interface iViaCep {
    cep: string | null;
    uf: string | null;
    localidade: string | null;
    bairro: string | null;
    logradouro: string | null;
    ddd: string | null;
    complemento: string | null;
    mensagemErro: string | null;
}