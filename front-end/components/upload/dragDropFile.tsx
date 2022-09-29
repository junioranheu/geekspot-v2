import { Dispatch, Fragment, ReactNode } from 'react';
import { FileUploader } from 'react-drag-drop-files'; // https://www.npmjs.com/package/react-drag-drop-files

interface iParametros {
    nomeElemento: string;
    tipoArquivos: string[];
    isMultiple: boolean;
    setArquivo: Dispatch<File> | any;
    texto: string;
    maxSizeMBs: number;
    isDisabled: boolean;
    conteudo: ReactNode;
}

export default function DragDropFile({ nomeElemento, tipoArquivos, isMultiple, setArquivo, texto, maxSizeMBs, isDisabled, conteudo }: iParametros) {
    
    function handleChange(arquivo: any) {
        setArquivo(arquivo);
    }

    return (
        <FileUploader
            handleChange={(handleChange)}
            name={nomeElemento}
            types={tipoArquivos}
            multiple={isMultiple}
            label={texto}
            maxSize={maxSizeMBs}
            disabled={isDisabled}
        >
            <Fragment>{conteudo}</Fragment>
        </FileUploader>
    );
}

