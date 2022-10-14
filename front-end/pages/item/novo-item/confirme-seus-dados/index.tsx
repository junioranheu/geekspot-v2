import Router from 'next/router';
import { useEffect, useState } from 'react';
import Botao from '../../../../components/outros/botao';
import DadosPessoais from '../../../../components/svg/dadosPessoais';
import Endereco from '../../../../components/svg/endereco';
import Loja from '../../../../components/svg/loja';
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
            Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        }
    }, [usuarioId]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={`${Styles.main} paddingPadrao paddingPadraoMargemGrande`}>
            <div className={Styles.divEsquerda}>
                <span className='titulo'>
                    Antes de continuar, vamos precisar confirmar alguns dos seus <span className='cor-principal'>dados</span> e <span className='cor-principal'>confirmar sua conta</span>
                </span>

                <span className='texto'>
                    Ao clicar no botão para <span className='cor-principal'>verificar dados</span>, não se esqueça de preencher todos os <span className='cor-principal'>campos obrigatórios</span> e salvar as informações; e, também, usar o botão no final da página para iniciar o processo de <span className='cor-principal'>confirmação da sua conta</span>!
                </span>
            </div>

            <div className={Styles.divDireita}>
                <div className={Styles.item}>
                    <Loja width={24} url={null} title={null} isCorPrincipal={false} />
                    <span className={Styles.titulo}>Dados da sua <span className='cor-principal'>lojinha</span></span>
                    <span className={Styles.texto}>Para poder liberar todo acesso à sua conta do {CONSTS_SISTEMA.NOME_SISTEMA}</span>
                </div>

                <div className={Styles.item}>
                    <DadosPessoais width={24} url={null} title={null} isCorPrincipal={false} />
                    <span className={Styles.titulo}>Dados <span className='cor-principal'>pessoais</span></span>
                    <span className={Styles.texto}>Para poder liberar todo acesso à sua conta do {CONSTS_SISTEMA.NOME_SISTEMA}</span>
                </div>

                <div className={Styles.item}>
                    <Endereco width={24} url={null} title={null} isCorPrincipal={false} />
                    <span className={Styles.titulo}>Dados do seu <span className='cor-principal'>endereço</span></span>
                    <span className={Styles.texto}>Para poder liberar todo acesso à sua conta do {CONSTS_SISTEMA.NOME_SISTEMA}</span>
                </div>

                <Botao texto='Verificar dados' url={CONSTS_TELAS.PERFIL_EDITAR} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
            </div>
        </section>
    )
}