import { Fragment, useState } from 'react';
import ModalExcluirConta from '../../../../../components/modal/modal.excluirConta';
import ModalLayout from '../../../../../components/modal/_modal.layout';
import ModalWrapper from '../../../../../components/modal/_modal.wrapper';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import AvisoSvg from '../../../../../components/svg/aviso';
import Styles from './index.module.scss';

export default function SessaoMinhaConta() {

    const [isModalExcluirConta, setIsModalExcluirConta] = useState(false);

    return (
        <Fragment>
            {/* Modal */}
            <ModalWrapper isOpen={isModalExcluirConta}>
                <ModalLayout handleModal={() => setIsModalExcluirConta(!isModalExcluirConta)} isExibirApenasLogo={true} titulo='Entre agora mesmo' tamanho='pequeno' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalExcluirConta handleModal={() => setIsModalExcluirConta(!isModalExcluirConta)} />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Minha conta' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className={`${Styles.botaoFonteVermelha} divBotaoInvertido`}>
                        <Botao
                            texto='&nbsp;&nbsp;Quero excluir minha conta'
                            url={null}
                            isNovaAba={false}
                            handleFuncao={() => setIsModalExcluirConta(true)}
                            Svg={<AvisoSvg width={16} url={null} title={null} isCorPrincipal={false} />}
                            refBtn={null}
                            isEnabled={true}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

