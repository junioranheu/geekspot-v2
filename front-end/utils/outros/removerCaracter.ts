export default function removerCaracter(str: string, char: string) {
    return str?.replaceAll(char, '');
}