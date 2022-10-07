import { Fragment, useState } from 'react';
import ModalDesativarConta from '../../../../../components/modal/modal.desativarConta';
import ModalLayout from '../../../../../components/modal/_modal.layout';
import ModalWrapper from '../../../../../components/modal/_modal.wrapper';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import AvisoSvg from '../../../../../components/svg/aviso';
import Styles from './index.module.scss';

export default function SessaoMinhaConta() {

    const [isModalDesativarConta, setIsModalDesativarConta] = useState(false);

    return (
        <Fragment>
            {/* Modal desativar conta */}
            <ModalWrapper isOpen={isModalDesativarConta}>
                <ModalLayout handleModal={() => setIsModalDesativarConta(!isModalDesativarConta)} isExibirApenasLogo={true} titulo='Desativar conta' tamanho='pequeno' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalDesativarConta handleModal={() => setIsModalDesativarConta(!isModalDesativarConta)} />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <span className='separadorHorizontal'></span>
            <div className='margem0_5'>
                <TopHatSecundario titulo='Minha conta' />

                <div className={`${Styles.sessao} margem0_5`}>
                    <div className={`${Styles.botaoFonteVermelha} divBotaoInvertido`}>
                        <Botao
                            texto='&nbsp;&nbsp;Quero desativar minha conta'
                            url={null}
                            isNovaAba={false}
                            handleFuncao={() => setIsModalDesativarConta(true)}
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

