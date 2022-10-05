import nProgress from 'nprogress';
import { ChangeEvent, Dispatch, useRef, useState } from 'react';
import Botao from '../../../../../components/outros/botao';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import DivUpload from '../../../../../components/upload/divUpload';
import { Fetch } from '../../../../../utils/api/fetch';
import CONSTS_UPLOAD from '../../../../../utils/consts/data/constUpload';
import CONSTS_USUARIOS from '../../../../../utils/consts/data/constUsuarios';
import UPLOAD_IMAGEM from '../../../../../utils/consts/outros/uploadImagem';
import { Auth } from '../../../../../utils/context/usuarioContext';
import { Aviso } from '../../../../../utils/outros/aviso';
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
    lojinhaTitulo: string,
    lojinhaDescricao: string;
}

export default function SessaoLojinha({ usuario, arquivoUploadFotoPerfil, setArquivoUploadFotoPerfil, arquivoUploadCapaLojinha, setArquivoUploadCapaLojinha }: iParametros) {

    const refBtn = useRef<any>(null);

    const [formDataLojinha, setFormDataLojinha] = useState<iFormLojinha>({
        lojinhaTitulo: usuario?.usuariosInformacoes?.lojinhaTitulo ?? '',
        lojinhaDescricao: usuario?.usuariosInformacoes?.lojinhaDescricao ?? ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataLojinha({ ...formDataLojinha, [e.target.name]: e.target.value });
    }

    async function handleSubmit() {
        if (!formDataLojinha.lojinhaTitulo || formDataLojinha.lojinhaTitulo.length < 3) {
            Aviso.warn('O <b>nome da sua lojinha</b> não pode conter menos que 3 caracteres', 5000);
            return false;
        }

        nProgress.start();
        refBtn.current.disabled = true;

        const url = CONSTS_USUARIOS.API_URL_PUT_ATUALIZAR_DADOS_LOJINHA;
        const dto = {
            foto: arquivoUploadFotoPerfil,
            usuariosInformacoes: {
                lojinhaTitulo: formDataLojinha.lojinhaTitulo,
                lojinhaDescricao: formDataLojinha.lojinhaDescricao,
                lojinhaImagemCapa: arquivoUploadCapaLojinha,
            }
        };

        const resposta = await Fetch.putApi(url, dto) as iUsuario;
        if (!resposta || resposta?.erro) {
            nProgress.done();
            refBtn.current.disabled = false;
            Aviso.warn(resposta?.mensagemErro ?? 'Houve um erro ao atualizar os dados', 5000);
            return false;
        }

        // Atualizar no local storage;
        const dadosUsuario = { foto: resposta.foto }
        Auth.update(dadosUsuario);

        nProgress.done();
        refBtn.current.disabled = false;
        Aviso.success('Os dados da sua lojinha foram atualizados com sucesso', 5000);
    }

    return (
        <div>
            <TopHatSecundario titulo='Lojinha' />

            <div className={`${Styles.sessao} margem0_5`}>
                <div className={Styles.divInput}>
                    <span className={Styles.item}>Nome da lojinha</span>
                    <input className='input' type='text' name='lojinhaTitulo' onChange={handleChange} value={formDataLojinha.lojinhaTitulo} />
                </div>

                <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <span className={Styles.item}>Descrição ou bio da lojinha</span>
                    <input className='input' type='text' name='lojinhaDescricao' onChange={handleChange} value={formDataLojinha.lojinhaDescricao} />
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
                    <Botao texto='Salvar alterações dos dados da sua lojinha' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={refBtn} isEnabled={true} />
                </div>
            </div>
        </div>
    )
}

