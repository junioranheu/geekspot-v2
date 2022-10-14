import nProgress from 'nprogress';
import { ChangeEvent, Dispatch, useRef, useState } from 'react';
import Botao from '../../../../../components/outros/botao';
import Input from '../../../../../components/outros/input';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import DivUpload from '../../../../../components/upload/divUpload';
import { Fetch } from '../../../../../utils/api/fetch';
import CONSTS_UPLOAD from '../../../../../utils/consts/data/constUpload';
import CONSTS_USUARIOS from '../../../../../utils/consts/data/constUsuarios';
import UPLOAD_IMAGEM from '../../../../../utils/consts/outros/uploadImagem';
import { Aviso } from '../../../../../utils/outros/aviso';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
    arquivoUploadFotoPerfil: string | null;
    setArquivoUploadFotoPerfil: Dispatch<string>;
    arquivoUploadCapaLojinha: string | null;
    setArquivoUploadCapaLojinha: Dispatch<string>;

    isHouveAlteracao: boolean;
    setIsHouveAlteracao: Dispatch<boolean>;
}

interface iFormLojinha {
    lojinhaTitulo: string;
    lojinhaDescricao: string;
}

export default function SessaoLojinha({ usuario, arquivoUploadFotoPerfil, setArquivoUploadFotoPerfil, arquivoUploadCapaLojinha, setArquivoUploadCapaLojinha, isHouveAlteracao, setIsHouveAlteracao }: iParametros) {

    const refBtn = useRef<any>(null);
    const minCaracteresNomeLojinha = 5;

    const [formDataLojinha, setFormDataLojinha] = useState<iFormLojinha>({
        lojinhaTitulo: usuario?.usuariosInformacoes?.lojinhaTitulo ?? '',
        lojinhaDescricao: usuario?.usuariosInformacoes?.lojinhaDescricao ?? ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataLojinha({ ...formDataLojinha, [e.target.name]: e.target.value });
        !isHouveAlteracao && setIsHouveAlteracao(true);
    }

    async function handleSubmit() {
        if (!formDataLojinha.lojinhaTitulo || formDataLojinha.lojinhaTitulo.length < minCaracteresNomeLojinha) {
            Aviso.warn(`O <b>nome da sua lojinha</b> não pode conter menos que ${minCaracteresNomeLojinha} caracteres`, 5000);
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

        nProgress.done();
        refBtn.current.disabled = false;
        Aviso.success('Os <b>dados da sua lojinha</b> foram atualizados com sucesso', 5000);
    }

    return (
        <div>
            <TopHatSecundario titulo='Lojinha' />

            <div className={`${Styles.sessao} margem0_5`}>
                <Input
                    titulo='Nome da lojinha'
                    placeholder=''
                    name='lojinhaTitulo'
                    tipo='text'
                    isDisabled={false}
                    minCaracteres={minCaracteresNomeLojinha}
                    dataTip={`O nome da sua lojinha deve ter pelo menos ${minCaracteresNomeLojinha} caracteres`}
                    isExisteValidacaoExtra={false}
                    handleValidacaoExtra={null}
                    value={formDataLojinha.lojinhaTitulo}
                    mascara=''
                    referencia={null}
                    isExibirIconeDireita={true}
                    handleChange={handleChange}
                    handleKeyPress={() => null}
                    handleBlur={() => null}
                />

                <span className='separadorHorizontal'></span>
                <Input
                    titulo='Descrição ou bio da lojinha'
                    placeholder=''
                    name='lojinhaDescricao'
                    tipo='text'
                    isDisabled={false}
                    minCaracteres={0}
                    dataTip=''
                    isExisteValidacaoExtra={false}
                    handleValidacaoExtra={null}
                    value={formDataLojinha.lojinhaDescricao}
                    mascara=''
                    referencia={null}
                    isExibirIconeDireita={false}
                    handleChange={handleChange}
                    handleKeyPress={() => null}
                    handleBlur={() => null}
                />

                <span className='separadorHorizontal'></span>
                <div className={Styles.divInput}>
                    <DivUpload
                        imagem={usuario?.foto ?? ''}
                        apiPasta={CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}
                        titulo='Foto de perfil'
                        infoAleatoriaUm='Escolhe uma foto da hora aí'
                        infoAleatoriaDois={`Peso máximo: ${UPLOAD_IMAGEM.LIMITE_MB} MB`}
                        textoBotaoDireita='Alterar foto de perfil'
                        limitarAspectRatio={null}
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
                        textoBotaoDireita='Alterar capa'
                        limitarAspectRatio={16 / 2}
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

