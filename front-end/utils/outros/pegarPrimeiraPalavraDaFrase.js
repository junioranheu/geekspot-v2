export default function pegarPrimeiraPalavraDaFrase(str) {
    const strSplitada = str.split(' ');
    const primeiraPalavra = strSplitada[0];
    
    return primeiraPalavra;
}