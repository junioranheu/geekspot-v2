import { useEffect, useState } from 'react';
import CONSTS_SISTEMA from '../../utils/consts/data/constSistema';
import { Auth } from '../../utils/context/usuarioContext';
import { Fetch } from '../../utils/outros/fetch';
import formatarDadosParaDropDown from '../../utils/outros/formatarDadosParaDropDown';

export default function useCidades(estadoId: number, isFormatarDadosParaDropdown: boolean) {

    const token = Auth?.get()?.token ?? null;
    const [cidades, setCidades] = useState<any>();

    useEffect(() => {
        async function getCidades(token: string, estadoId: number) {
            const url = `${CONSTS_SISTEMA.API_URL_GET_TODAS_CIDADES}?estadoId=${estadoId}`;
            const cidades = await Fetch.getApi(url, token);

            if (isFormatarDadosParaDropdown) {
                setCidades(formatarDadosParaDropDown(cidades));
            } else {
                setCidades(cidades);
            }
        }

        if (token && estadoId) {
            getCidades(token, estadoId);
        }
    }, [token, estadoId])

    return cidades;
}