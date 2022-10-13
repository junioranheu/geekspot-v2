export default function ajustarUrl(url: string) {
    // console.log(url);
    let urlAjustada = url.normalize('NFD').replace(/\p{Diacritic}/gu, ''); // Remover acentuação e letras estranhas;
    urlAjustada = urlAjustada.replace(/\s+/g, '-').toLowerCase(); // Trocar espaços por traços e deixar em minúsculo;
    urlAjustada = urlAjustada.replaceAll('?', '');
    urlAjustada = urlAjustada.replaceAll('!', '');
    urlAjustada = urlAjustada.replaceAll('~', '');
    urlAjustada = urlAjustada.replaceAll('<', '');
    urlAjustada = urlAjustada.replaceAll('>', '');
    urlAjustada = urlAjustada.replaceAll('(', '');
    urlAjustada = urlAjustada.replaceAll(')', '');
    urlAjustada = urlAjustada.replaceAll('$', '');
    urlAjustada = urlAjustada.replaceAll('%', '');
    urlAjustada = urlAjustada.replaceAll('{', '');
    urlAjustada = urlAjustada.replaceAll('}', '');
    urlAjustada = urlAjustada.replaceAll('[', '');
    urlAjustada = urlAjustada.replaceAll(']', '');
    urlAjustada = urlAjustada.replaceAll('_', '');
    urlAjustada = urlAjustada.replaceAll('*', '');
    urlAjustada = urlAjustada.replaceAll('+', '');
    urlAjustada = urlAjustada.replaceAll('¨', '');
    urlAjustada = urlAjustada.replaceAll('.', ''); 
    urlAjustada = urlAjustada.replaceAll(':', '-'); // Trocar dois pontos por traços;
    urlAjustada = urlAjustada.replaceAll('/', '-'); // Trocar barras por traços;
    urlAjustada = urlAjustada.replaceAll('\\', '-'); // Trocar barras invertidas por traços;
    urlAjustada = urlAjustada.replaceAll(',', '-'); // Trocar vírgulas por traços;
    urlAjustada = urlAjustada.replaceAll('#', 'sharp'); // # pela palavra "sharp";

    // console.log(`urlAjustada: ${urlAjustada}`);
    return urlAjustada;
}