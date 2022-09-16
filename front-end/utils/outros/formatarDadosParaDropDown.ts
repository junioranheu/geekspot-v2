export default function formatarDadosParaDropDown(dados: any[], label: string, value: string) {
    const dadosFormatados = [] as any;

    dados.forEach(element => {
        dadosFormatados.push({ label: element[label] as string, value: element[value] as string });
    });

    return dadosFormatados;
}

