// https://stackoverflow.com/a/8089922
export default function pad(str: string, max: number, strEsquerda: string | null): string {
    return str.length < max ? pad((strEsquerda ?? '0') + str, max, strEsquerda) : str;
}
