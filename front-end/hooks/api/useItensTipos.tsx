import { useEffect, useState } from 'react';
import CONSTS_ITENS_TIPOS from '../../utils/consts/data/constItensTipos';
import { Fetch } from '../../utils/outros/fetch';
import iItemTipo from '../../utils/types/itemTipo';

export default function useItensTipos(isFormatarDadosParaDropdown: boolean) {

    function formatarDadosParaDropDownEspecial(dados: iItemTipo[]) {
        const dadosFormatados = [] as any;

        dados.forEach(element => {
            dadosFormatados.push({ label: element.tipo as string, value: element.itemTipoId.toString() as string });
        });

        return dadosFormatados;
    }

    const [dados, setDados] = useState<iItemTipo[]>();
    useEffect(() => {
        async function get() {
            const url = CONSTS_ITENS_TIPOS.API_URL_GET_TODOS;
            const fetchDados = await Fetch.getApi(url, null);

            if (isFormatarDadosParaDropdown) {
                setDados(formatarDadosParaDropDownEspecial(fetchDados));
            } else {
                setDados(fetchDados);
            }
        }

        get();
    }, [])

    return dados;
}