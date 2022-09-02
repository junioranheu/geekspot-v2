// https://stackoverflow.com/a/43532829
export default function arredondarNumero(numero: number, casas: number): number {
    numero = numero * Math.pow(10, casas);
    numero = Math.round(numero);
    numero = numero / Math.pow(10, casas);

    return numero;
}