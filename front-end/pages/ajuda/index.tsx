import { Fragment, useState } from 'react';
import ModalUpload from '../../components/modal/modal.upload/modal.upload';
import ModalLayout from '../../components/modal/_modal.layout';
import ModalWrapper from '../../components/modal/_modal.wrapper';
import Botao from '../../components/outros/botao';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import Styles from './index.module.scss';

export default function Index() {
    document.title = `Ajuda — ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
    const [arquivoUpload, setArquivoUpload] = useState(null);

    return (
        <Fragment>
            <ModalWrapper isOpen={isModalUploadOpen} >
                <ModalLayout handleModal={() => setIsModalUploadOpen(!isModalUploadOpen)} titulo='Arraste a imagem para ajustar' tamanho='' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalUpload handleModal={() => setIsModalUploadOpen(!isModalUploadOpen)} setArquivoUpload={setArquivoUpload} />
                </ModalLayout>
            </ModalWrapper>

            <main className={`${Styles.wrapper} paddingPadrao`}>
                <h1>Ajuda</h1>
                <Botao texto='Abrir modal' url={null} isNovaAba={false} handleFuncao={() => setIsModalUploadOpen(true)} Svg={null} refBtn={null} isEnabled={true} />
            </main>
        </Fragment>
    )
}

