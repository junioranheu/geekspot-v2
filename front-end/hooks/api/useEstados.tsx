import { useEffect, useState } from 'react';
import { Fetch } from '../../utils/api/fetch';
import CONSTS_SISTEMA from '../../utils/consts/data/constSistema';
import formatarDadosParaDropDown from '../../utils/outros/formatarDadosParaDropDown';
import iEstado from '../../utils/types/estado';

export default function useEstados(isFormatarDadosParaDropdown: boolean) {

    const [dados, setDados] = useState<iEstado[]>();
    useEffect(() => {
        async function get() {
            const url = CONSTS_SISTEMA.API_URL_GET_TODOS_ESTADOS;
            const fetchDados = await Fetch.getApi(url);

            if (isFormatarDadosParaDropdown) {
                setDados(formatarDadosParaDropDown(fetchDados, 'nome', 'estadoId'));
            } else {
                setDados(fetchDados);
            }
        }

        get();
    }, [])

    return dados;
}