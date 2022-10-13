import Router from 'next/router';
import { useEffect, useState } from 'react';
import Botao from '../../../../components/outros/botao';
import CONSTS_ERROS from '../../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../../utils/consts/outros/telas';
import { Auth } from '../../../../utils/context/usuarioContext';
import paginaCarregada from '../../../../utils/outros/paginaCarregada';
import Styles from './index.module.scss';

export default function Index() {

    document.title = `Confirme seus dados — ${CONSTS_SISTEMA.NOME_SISTEMA}`;
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);

        if (!usuarioId) {
            Router.push({ pathname: '/404', query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        }
    }, [usuarioId]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={`${Styles.main} paddingPadrao paddingPadraoMargemGrande`}>
            <div className={Styles.divEsquerda}>
                <span className='titulo'>Antes de continuar, vamos precisar confirmar alguns dados seus e <span className='cor-principal'>confirmar sua conta</span></span>
            </div>

            <div className={Styles.divDireita}>
                <div className={Styles.item}>
                    <span>x</span>
                    <span className={Styles.titulo}>Dados da sua lojinha</span>
                    <span className={Styles.texto}>Para poder liberar todo acesso à sua conta do {CONSTS_SISTEMA.NOME_SISTEMA}</span>
                </div>

                <div className={Styles.item}>
                    <span>x</span>
                    <span className={Styles.titulo}>Dados pessoais</span>
                    <span className={Styles.texto}>Para poder liberar todo acesso à sua conta do {CONSTS_SISTEMA.NOME_SISTEMA}</span>
                </div>

                <div className={Styles.item}>
                    <span>x</span>
                    <span className={Styles.titulo}>Dados do seu endereço</span>
                    <span className={Styles.texto}>Para poder liberar todo acesso à sua conta do {CONSTS_SISTEMA.NOME_SISTEMA}</span>
                </div>

                <Botao texto='Verificar dados' url={CONSTS_TELAS.PERFIL_EDITAR} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
            </div>
        </section>
    )
}