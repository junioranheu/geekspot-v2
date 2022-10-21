import Link from 'next/link';
import { Fragment, useContext } from 'react';
import CONSTS_TELAS from '../../../../utils/consts/outros/telas';
import { UsuarioContext } from '../../../../utils/context/usuarioContext';
import Botao from '../../../outros/botao';
import Ajuda from '../../../svg/ajuda';
import Configuracao from '../../../svg/configuracao';
import Coracao from '../../../svg/coracao';
import Inbox from '../../../svg/inbox';
import Item from '../../../svg/item';
import Loja from '../../../svg/loja';
import Seguranca from '../../../svg/seguranca';

interface iParametros {
    isMeuPerfilBotao: boolean;
    urlPerfil: string;
}

export default function MenuUsuarioOpcoes({ isMeuPerfilBotao, urlPerfil }: iParametros) {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    return (
        <Fragment>
            {
                isAuth && (
                    <Fragment>
                        {
                            isMeuPerfilBotao ? (
                                <Botao texto='Meu perfil' url={urlPerfil} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
                            ) : (
                                <Link href={urlPerfil}><a><Loja width={16} url={null} title={null} isCorPrincipal={false} />&nbsp;&nbsp;Meu perfil</a></Link>
                            )
                        }

                        <Link href={CONSTS_TELAS.QUERO_VENDER}><a><Item width={16} url={null} title={null} isCorPrincipal={false} />&nbsp;&nbsp;Quero vender</a></Link>
                        <Link href='/xxx'><a><Inbox width={16} url={null} title={null} isCorPrincipal={false} />&nbsp;&nbsp;Inbox</a></Link>
                        <Link href='/xxx'><a><Coracao width={16} url={null} title={null} isCorPrincipal={false} />&nbsp;&nbsp;Favoritos</a></Link>
                        <Link href={CONSTS_TELAS.PERFIL_EDITAR}><a><Configuracao width={16} url={null} title={null} isCorPrincipal={false} />&nbsp;&nbsp;Configurações</a></Link>
                    </Fragment>
                )
            }

            <Link href={CONSTS_TELAS.SEGURANCA}><a><Seguranca width={16} url={null} title={null} isCorPrincipal={false} />&nbsp;&nbsp;Segurança</a></Link>
            <Link href={CONSTS_TELAS.AJUDA}><a><Ajuda width={16} url={null} title={null} isCorPrincipal={false} />&nbsp;&nbsp;Ajuda</a></Link>
        </Fragment>
    )
}