import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Botao from '../../../../../components/outros/botao';
import Configuracao from '../../../../../components/svg/configuracao';
import Coracao from '../../../../../components/svg/coracao';
import Loja from '../../../../../components/svg/loja';
import ImgCinza from '../../../../../static/image/outros/cinza.webp';
import CONSTS_SISTEMA from '../../../../../utils/consts/outros/sistema';
import { Auth } from '../../../../../utils/context/usuarioContext';
import formatarData from '../../../../../utils/outros/formatarData';
import iUsuario from '../../../../../utils/types/usuario';
import StylesTexto from '../index.module.scss';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
    arquivoUploadFotoPerfil: string | null;
    arquivoUploadCapaLojinha: string | null;
}

export default function SessaoEsquerda({ usuario, arquivoUploadFotoPerfil, arquivoUploadCapaLojinha }: iParametros) {

    const idUsuario = Auth?.get()?.usuarioId ?? 0;
    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';

    const [fotoPerfil, setFotoPerfil] = useState(ImgCinza.src);
    const [capaLojinha, setCapaLojinha] = useState(ImgCinza.src);
    useEffect(() => {
        // #1 - Verificar se a foto de perfil vem do upload, do banco ou de nenhuma das opções;
        if (arquivoUploadFotoPerfil) {
            setFotoPerfil(arquivoUploadFotoPerfil);
        } else {
            setFotoPerfil(ImgCinza.src);
        }

        // #2 - Verificar se a capa da lojinha vem do upload, do banco ou de nenhuma das opções;
        if (arquivoUploadCapaLojinha) {
            setCapaLojinha(arquivoUploadCapaLojinha);
        } else {
            setCapaLojinha(ImgCinza.src);
        }
    }, [arquivoUploadFotoPerfil, arquivoUploadCapaLojinha, usuario?.usuariosInformacoes?.lojinhaImagemCapa]);

    return (
        <div className={Styles.sessaoEsquerda}>
            <div className={Styles.divCapaLojinha} style={{ backgroundImage: `url(${capaLojinha})` }}>
                <div className={Styles.fotoPerfil}>
                    <Image src={fotoPerfil} width={100} height={100} alt='' />
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

