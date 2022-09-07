import 'cropperjs/dist/cropper.css';
import { Dispatch, Fragment, useRef } from 'react';
import Cropper from 'react-cropper'; // https://www.npmjs.com/package/react-cropper
import StylesUpload from './modal.upload.module.scss';

interface parametros {
    arquivoBlob: string;
    setArquivoCrop: Dispatch<string> | any;
}

export default function ModalUploadConteudo({ arquivoBlob, setArquivoCrop }: parametros) {

    const cropperRef = useRef<HTMLImageElement>(null);
    function handleCrop() {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        const imagemCropUrl = cropper.getCroppedCanvas().toDataURL();
        // console.log(imagemCropUrl);
        
        setArquivoCrop(imagemCropUrl);
    };

    return (
        <Fragment>
            {
                arquivoBlob ? (
                    <Cropper
                        src={arquivoBlob}
                        style={{ maxHeight: 400, width: '100%' }}
                        initialAspectRatio={16 / 9}
                        guides={false}
                        crop={handleCrop}
                        ref={cropperRef}
                    />
                ) : (
                    <div className={StylesUpload.divAvisoUpload}>
                        <h1>Clique aqui<br />ou arraste uma imagem</h1>
                    </div>
                )
            }
        </Fragment>
    )
}