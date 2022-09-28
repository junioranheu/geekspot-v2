import Image from 'next/image';
import Botao from '../../../../../components/outros/botao';
import ImgCinza from '../../../../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../../../../utils/consts/data/constUpload';
import CONSTS_SISTEMA from '../../../../../utils/consts/outros/sistema';
import { Auth } from '../../../../../utils/context/usuarioContext';
import formatarData from '../../../../../utils/outros/formatarData';
import iUsuario from '../../../../../utils/types/usuario';
import StylesTexto from '../index.module.scss';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

export default function SessaoEsquerda({ usuario }: iParametros) {

    const idUsuario = Auth?.get()?.usuarioId ?? 0;
    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';
    console.log(usuario);

    return (
        <div className={Styles.sessaoEsquerda}>
            <div
                className={Styles.divCapaLojinha}
                style={{ backgroundImage: `url(${(usuario?.usuariosInformacoes?.lojinhaImagemCapa ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_LOJINHAS_CAPAS}/${usuario?.usuariosInformacoes?.lojinhaImagemCapa}` : ImgCinza.src)})` }}
            >
                <div className={Styles.fotoPerfil}>
                    <Image src={(Auth?.get()?.foto ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${Auth?.get()?.foto}` : ImgCinza)} width={100} height={100} alt='' />
                </div>
            </div>

            <div className={Styles.infosImportantes}>
                <span className={StylesTexto.titulo}>@{usuario?.nomeUsuarioSistema}</span>
                <span className={StylesTexto.texto}>{usuario?.dataRegistro && `No ${CONSTS_SISTEMA.NOME_SISTEMA} desde ${formatarData(usuario?.dataRegistro, 3)}`}</span>

                <div className='margem1'>
                    <Botao texto='Meu perfil' url={`/usuario/perfil/${idUsuario}/@${nomeUsuario}`} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                </div>

                <span className='separadorHorizontal'></span>
            </div>
        </div>
    )
}

