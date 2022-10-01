export default function desabilitarTodosElementos() {
    const botoes = document.querySelectorAll('button');
    botoes.forEach((botao) => {
        botao.disabled = true;

        if (botao.textContent === 'Sair') {
            botao.disabled = false;
        }
    });

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        input.disabled = true;
    });
}