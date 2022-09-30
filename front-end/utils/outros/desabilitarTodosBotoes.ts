export default function desabilitarTodosBotoes() {
    const botoes = document.querySelectorAll('button');
    botoes.forEach((botao) => {
        botao.setAttribute('disabled', 'true');
    });
}