import Image from 'next/image';
import { Fragment, useState } from 'react';
import ImgCinza from '../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../utils/consts/data/constUpload';
import ModalUpload from '../modal/modal.upload/modal.upload';
import ModalLayout from '../modal/_modal.layout';
import ModalWrapper from '../modal/_modal.wrapper';
import Botao from '../outros/botao';
import Styles from './divUpload.module.scss';

interface iParametros {
    imagem: string | null;
    titulo: string;
    infoAleatoriaUm: string;
    infoAleatoriaDois: string | null;
    textoBotaoDireita: string | null;
}

export default function DivUpload({ imagem, titulo, infoAleatoriaUm, infoAleatoriaDois, textoBotaoDireita }: iParametros) {

    const [isModalUploadFotoPerfilOpen, setIsModalUploadFotoPerfilOpen] = useState(false);
    const [arquivoUploadFotoPerfil, setArquivoUploadFotoPerfil] = useState(null);
    
    return (
        <Fragment>
            {/* Modal */}
            <ModalWrapper isOpen={isModalUploadFotoPerfilOpen}>
                <ModalLayout handleModal={() => setIsModalUploadFotoPerfilOpen(!isModalUploadFotoPerfilOpen)} isExibirApenasLogo={true} titulo={null} tamanho='' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalUpload isBase64={true} handleModal={() => setIsModalUploadFotoPerfilOpen(!isModalUploadFotoPerfilOpen)} setArquivoUpload={setArquivoUploadFotoPerfil} />
                </ModalLayout>
            </ModalWrapper>

            <div className={Styles.main}>
                <Image src={(arquivoUploadFotoPerfil ? arquivoUploadFotoPerfil : imagem ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${imagem}` : ImgCinza)} width={100} height={100} alt='' />

                <div className={Styles.infos}>
                    <span className={Styles.titulo}>{titulo}</span>
                    <span className={Styles.texto}>{infoAleatoriaUm}</span>
                    <span className={Styles.texto}>{infoAleatoriaDois && infoAleatoriaDois}</span>
                    {imagem && <span className={`${Styles.texto} ${Styles.vermelho} pointer`}>Remover</span>}
                </div>

                {
                    textoBotaoDireita && (
                        <div className={Styles.divBotao}>
                            <span className='separador'></span>

                            <Botao
                                texto={textoBotaoDireita}
                                url={null}
                                isNovaAba={false}
                                handleFuncao={() => setIsModalUploadFotoPerfilOpen(true)}
                                Svg={null}
                                refBtn={null}
                                isEnabled={true}
                            />
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

