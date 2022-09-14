import { Fragment, useEffect, useState } from 'react';
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

    useEffect(() => {
        console.log(arquivoUpload);
    }, [arquivoUpload]);

    return (
        <Fragment>
            {/* Modal */}
            <ModalWrapper isOpen={isModalUploadOpen} >
                <ModalLayout handleModal={() => setIsModalUploadOpen(!isModalUploadOpen)} isExibirApenasLogo={true} titulo={null} tamanho='' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalUpload isBase64={false} handleModal={() => setIsModalUploadOpen(!isModalUploadOpen)} setArquivoUpload={setArquivoUpload} />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <main className={`${Styles.wrapper} paddingPadrao`}>
                <h1>Ajuda</h1>
                <Botao texto='Abrir modal de upload' url={null} isNovaAba={false} handleFuncao={() => setIsModalUploadOpen(true)} Svg={null} refBtn={null} isEnabled={true} />
            </main>
        </Fragment>
    )
}

