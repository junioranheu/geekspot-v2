import { ChangeEvent, Dispatch, useState } from 'react';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import DivUpload from '../../../../../components/upload/divUpload';
import CONSTS_UPLOAD from '../../../../../utils/consts/data/constUpload';
import UPLOAD_IMAGEM from '../../../../../utils/consts/outros/uploadImagem';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
    arquivoUploadFotoPerfil: string | null;
    setArquivoUploadFotoPerfil: Dispatch<string>;
    arquivoUploadCapaLojinha: string | null;
    setArquivoUploadCapaLojinha: Dispatch<string>;
}

interface iFormLojinha {
    nomeLojinha: string,
    descricaoLojinha: string;
}
 
export default function SessaoLojinha({ usuario, arquivoUploadFotoPerfil, setArquivoUploadFotoPerfil, arquivoUploadCapaLojinha, setArquivoUploadCapaLojinha }: iParametros) {

    const [formDataLojinha, setFormDataLojinha] = useState<iFormLojinha>({ nomeLojinha: '', descricaoLojinha: '' });
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataLojinha({ ...formDataLojinha, [e.target.name]: e.target.value });
    }

    return (
        // =-=-=-=-=-=-=-=-=-=-=-= #1 - Lojinha =-=-=-=-=-=-=-=-=-=-=-= 
        <div>
            <TopHatSecundario titulo='Lojinha' />

            <div className={`${Styles.sessao} margem0_5`}>
                <div className={Styles.divInput}>
                    <span className={Styles.item}>Nome da lojinha</span>
                    <input className='input' type='text' name='txtNomeLojinha' onChange={handleChange} />
                </div>

                <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <span className={Styles.item}>Descrição ou bio da lojinha</span>
                    <input className='input' type='text' />
                </div>

                <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <DivUpload
                        imagem={usuario?.foto ?? ''}
                        apiPasta={CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}
                        titulo='Foto de perfil'
                        infoAleatoriaUm='Escolhe uma foto da hora aí'
                        infoAleatoriaDois={`Peso máximo: ${UPLOAD_IMAGEM.LIMITE_MB} MB`}
                        textoBotaoDireita='Alterar foto de perfil'
                        arquivoUpload={arquivoUploadFotoPerfil}
                        setArquivoUpload={setArquivoUploadFotoPerfil}
                    />
                </div>

                <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <DivUpload
                        imagem={usuario?.usuariosInformacoes?.lojinhaImagemCapa ?? ''}
                        apiPasta={CONSTS_UPLOAD.API_URL_GET_USUARIOS_LOJINHAS_CAPAS}
                        titulo='Capa da lojinha'
                        infoAleatoriaUm='Selecione uma capa pra sua lojinha também'
                        infoAleatoriaDois={`Peso máximo: ${UPLOAD_IMAGEM.LIMITE_MB} MB`}
                        textoBotaoDireita='Alterar capa da lojinha'
                        arquivoUpload={arquivoUploadCapaLojinha}
                        setArquivoUpload={setArquivoUploadCapaLojinha}
                    />
                </div>

                <span className='separadorHorizontal'></span>
                <div className='divBotaoInvertido'>
                    <Botao texto='Salvar alterações dos dados da sua lojinha' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                </div>
            </div>
        </div>
    )
}

