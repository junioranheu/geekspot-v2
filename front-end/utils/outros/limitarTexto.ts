export default function limitarTexto(str: string, maxCaracteres: number) {
    let strFinal = str;

    if (str?.length > maxCaracteres) {
        strFinal = str.substring(0, maxCaracteres) + '...';
    }

    return strFinal;
}