import Router from 'next/router';
import { useEffect } from 'react';
import Styles from '../../../styles/usuario.autenticar.module.scss';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { Auth } from '../../../utils/context/usuarioContext';

export default function Index() {

    document.title = `Subir novo item — ${CONSTS_SISTEMA.NOME_SISTEMA}`;
    const isVerificado = Auth?.get()?.isVerificado ?? false;

    useEffect(() => {
        if (!isVerificado) {
            Router.push(CONSTS_TELAS.NOVO_ITEM_AVISO_NECESSARIO_PERFIL_EDITAR);
        }
    }, [isVerificado]);

    return (
        <section className={`${Styles.main} paddingPadrao paddingPadraoMargemGrande`}>
            <h1>Novo item</h1>
        </section>
    )
}