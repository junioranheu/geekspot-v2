import { useEffect, useState } from 'react';
import CONSTS_SISTEMA from '../../utils/consts/data/constSistema';
import { Auth } from '../../utils/context/usuarioContext';
import { Fetch } from '../../utils/outros/fetch';
import formatarDadosParaDropDown from '../../utils/outros/formatarDadosParaDropDown';

export default function useEstados(isFormatarDadosParaDropdown: boolean) {

    const token = Auth?.get()?.token ?? null;
    const [estados, setEstados] = useState<any>();

    useEffect(() => {
        async function getCidades(token: string) {
            const url = CONSTS_SISTEMA.API_URL_GET_TODOS_ESTADOS;
            const cidades = await Fetch.getApi(url, token);

            if (isFormatarDadosParaDropdown) {
                setEstados(formatarDadosParaDropDown(cidades));
            } else {
                setEstados(cidades);
            }
        }

        if (token) {
            getCidades(token);
        }
    }, [token])

    return estados;
}