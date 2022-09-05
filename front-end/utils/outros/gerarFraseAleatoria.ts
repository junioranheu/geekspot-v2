export default function gerarFraseAleatoria() {
    const frases = [
        'aqui', 'ver tudo', 'quero', 'muito mais aqui', 'corre aqui',
        'é aqui', 'imperdível', 'aí sim, meu patrão', 'muito chic',
        'ver agora', 'uhu!', 'aí sim', 'opa', 'é pra já',
        'uhuuu', 'boraaa'
    ];

    const random = Math.floor(Math.random() * frases.length);
    return frases[random];
}