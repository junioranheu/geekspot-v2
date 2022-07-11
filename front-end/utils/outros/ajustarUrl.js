export default function ajustarUrl(url) {
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
    urlAjustada = urlAjustada.replaceAll('/', '-'); // Trocar barras por traços;
    urlAjustada = urlAjustada.replaceAll('.', '-'); // Trocar pontos por traços;
    urlAjustada = urlAjustada.replaceAll(',', '-'); // Trocar vírgulas por traços;
    urlAjustada = urlAjustada.replaceAll('#', 'sharp'); // # por Sharp;

    // console.log(`urlAjustada: ${urlAjustada}`);
    return urlAjustada;
}