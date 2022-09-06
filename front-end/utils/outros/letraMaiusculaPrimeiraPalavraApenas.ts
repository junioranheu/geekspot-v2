export default function letraMaiusculaPrimeiraPalavraApenas(str: string){
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}