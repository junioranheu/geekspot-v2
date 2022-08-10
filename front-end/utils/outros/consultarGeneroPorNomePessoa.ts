import { getGender } from 'gender-detection-from-name'; // https://www.npmjs.com/package/gender-detection-from-name

export default function consultarGeneroPorNomePessoa(nome: string) {
    const genero = getGender(nome);
    const generoFinal = (genero === 'female' ? 'a' : 'o');

    return generoFinal;
}