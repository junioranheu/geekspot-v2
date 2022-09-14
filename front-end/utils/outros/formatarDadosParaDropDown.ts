export default function formatarDadosParaDropDown(dados: Array<any>) {
    const dadosFormatados = [];

    for (const [key, value] of Object.entries(dados)) {
        dadosFormatados.push({ label: value as string, value: key as string });
    }

    return dadosFormatados;
}