import Router from 'next/router';
import { useEffect } from 'react';
import Styles from '../../../styles/usuario.autenticar.module.scss';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { Auth } from '../../../utils/context/usuarioContext';

export default function Index() {

    document.title = `Quero vender — ${CONSTS_SISTEMA.NOME_SISTEMA}`;
    const usuarioId = Auth?.get()?.usuarioId ?? 0;
    const isVerificado = Auth?.get()?.isVerificado ?? false;

    useEffect(() => {
        if (!isVerificado) {
            Router.push(CONSTS_TELAS.QUERO_VENDER_AVISO_NECESSARIO_PERFIL_EDITAR);
        }

        if (!usuarioId) {
            Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        }
    }, [isVerificado, usuarioId]);

    return (
        <section className={`${Styles.main} paddingPadrao paddingPadraoMargemGrande`}>
    
        </section>
    )
}