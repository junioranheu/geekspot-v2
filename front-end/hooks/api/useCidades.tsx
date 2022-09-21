import { useEffect, useState } from 'react';
import { Fetch } from '../../utils/api/fetch';
import CONSTS_SISTEMA from '../../utils/consts/data/constSistema';
import formatarDadosParaDropDown from '../../utils/outros/formatarDadosParaDropDown';
import iCidade from '../../utils/types/cidade';

export default function useCidades(estadoId: number, isFormatarDadosParaDropdown: boolean) {

    const [dados, setDados] = useState<iCidade[]>();
    useEffect(() => {
        async function get(estadoId: number) {
            const url = `${CONSTS_SISTEMA.API_URL_GET_TODAS_CIDADES}/${estadoId}`;
            const fetchDados = await Fetch.getApi(url, null);
            // console.log(fetchDados);

            if (isFormatarDadosParaDropdown) {
                setDados(formatarDadosParaDropDown(fetchDados, 'nome', 'cidadeId'));
            } else {
                setDados(fetchDados);
            }
        }

        if (estadoId) {
            get(estadoId);
        }
    }, [])

    return dados;
}