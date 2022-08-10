export default function pegarPrimeiraPalavraDaFrase(str: string) {
    const strSplitada = str.split(' ');
    const primeiraPalavra = strSplitada[0];

    return primeiraPalavra;
}