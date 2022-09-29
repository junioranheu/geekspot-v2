import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import Botao from '../../../../../components/outros/botao';
import Configuracao from '../../../../../components/svg/configuracao';
import Coracao from '../../../../../components/svg/coracao';
import Loja from '../../../../../components/svg/loja';
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

            <div className={`${Styles.infosImportantes} ${StylesTexto.centralizarTexto}`}>
                <span className={StylesTexto.titulo}>@{usuario?.nomeUsuarioSistema}</span>
                <span className={StylesTexto.textoPequeno}>{usuario?.dataRegistro && `No ${CONSTS_SISTEMA.NOME_SISTEMA} desde ${formatarData(usuario?.dataRegistro, 3)}`}</span>

                <div className='margem1'>
                    <Botao texto='Meu perfil' url={`/usuario/perfil/${idUsuario}/@${nomeUsuario}`} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                </div>

                <span className='separadorHorizontal'></span>
            </div>

            <div className={Styles.outrasOpcoes}>
                <div className={Styles.opcao}>
                    <div className={Styles.flexOpcao}>
                        <Loja width={18} url={null} title={null} isCorPrincipal={false} />
                        <span>Meus negócios</span>
                    </div>

                    <div className={Styles.subOpcoes}>
                        <Link href='/'><a className='cor-principal-hover'>Inbox</a></Link>
                        <Link href='/'><a className='cor-principal-hover'>Trocas</a></Link>
                        <Link href='/'><a className='cor-principal-hover'>Vendas</a></Link>
                        <Link href='/'><a className='cor-principal-hover'>Compras</a></Link>
                    </div>
                </div>

                <div className={`${Styles.opcao} pointer cor-principal-hover`} title='Visualizar itens favoritados'>
                    <div className={Styles.flexOpcao} onClick={() => Router.push('/')}>
                        <Coracao width={18} url={null} title={null} isCorPrincipal={false} />
                        <span className='cor-principal-hover'>Favoritos</span>
                    </div>
                </div>

                <div className={`${Styles.opcao} pointer cor-principal cor-principal-hover`} title='Você está aqui nas configurações 👽'>
                    <div className={Styles.flexOpcao}>
                        <Configuracao width={18} url={null} title={null} isCorPrincipal={true} />
                        <span>Configurações</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

