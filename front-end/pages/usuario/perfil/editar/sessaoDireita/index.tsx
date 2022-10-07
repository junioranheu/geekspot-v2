import { Dispatch } from 'react';
import TopHat from '../../../../../components/outros/topHat';
import Configuracao from '../../../../../components/svg/configuracao';
import useAvisoAlteracoesNaoSalvas from '../../../../../hooks/outros/useAvisoAlteracoesNaoSalvas';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';
import SessaoDadosPessoais from './sessao.dadosPessoais';
import SessaoEndereco from './sessao.endereco';
import SessaoLojinha from './sessao.lojinha';
import SessaoMinhaConta from './sessao.minhaConta';

interface iParametros {
    usuario: iUsuario | undefined;
    arquivoUploadFotoPerfil: string | null;
    setArquivoUploadFotoPerfil: Dispatch<string>;
    arquivoUploadCapaLojinha: string | null;
    setArquivoUploadCapaLojinha: Dispatch<string>;
}

export default function SessaoDireita({ usuario, arquivoUploadFotoPerfil, setArquivoUploadFotoPerfil, arquivoUploadCapaLojinha, setArquivoUploadCapaLojinha }: iParametros) {

    useAvisoAlteracoesNaoSalvas(true, '');

    return (
        <div className={Styles.sessaoDireita}>
            <TopHat Svg={<Configuracao width={22} url={null} title={null} isCorPrincipal={false} />} titulo='Configurações' />

            <div className={`${Styles.main} margem1`}>
                {/* =-=-=-=-=-=-=-=-=-=-=-= #1 - Lojinha =-=-=-=-=-=-=-=-=-=-=-=- */}
                <SessaoLojinha
                    usuario={usuario}
                    arquivoUploadFotoPerfil={arquivoUploadFotoPerfil}
                    setArquivoUploadFotoPerfil={setArquivoUploadFotoPerfil}
                    arquivoUploadCapaLojinha={arquivoUploadCapaLojinha}
                    setArquivoUploadCapaLojinha={setArquivoUploadCapaLojinha}
                />

                {/* =-=-=-=-=-=-=-=-=-=-=-= #2 - Dados pessoais =-=-=-=-=-=-=-=-= */}
                <SessaoDadosPessoais usuario={usuario} />

                {/* =-=-=-=-=-=-=-=-=-=-=-= #3 - Endereço =-=-=-=-=-=-=-=-=-=-=-= */}
                <SessaoEndereco usuario={usuario} />

                {/* =-=-=-=-=-=-=-=-=-=-=-= #4 - Minha conta =-=-=-=-=-=-=-=-=-=- */}
                <SessaoMinhaConta />
            </div>
        </div>
    )
}

