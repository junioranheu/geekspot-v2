import { useEffect, useState } from 'react';
import CONSTS_ITENS_TIPOS from '../../utils/consts/data/constItensTipos';
import { Fetch } from '../../utils/outros/fetch';
import formatarDadosParaDropDown from '../../utils/outros/formatarDadosParaDropDown';
import iItemTipo from '../../utils/types/itemTipo';

export default function useItensTipos(isFormatarDadosParaDropdown: boolean) {
    
    const [dados, setDados] = useState<iItemTipo[]>();
    useEffect(() => {
        async function get() {
            const url = CONSTS_ITENS_TIPOS.API_URL_GET_TODOS;
            const fetchDados = await Fetch.getApi(url, null) ; 

            if (isFormatarDadosParaDropdown) {
                setDados(formatarDadosParaDropDown(fetchDados, 'tipo', 'itemTipoId'));
            } else {
                setDados(fetchDados);
            }
        }

        get();
    }, [])

    return dados;
}