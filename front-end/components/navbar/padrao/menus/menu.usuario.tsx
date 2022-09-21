import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, Fragment } from 'react';
import { Auth } from '../../../../utils/context/usuarioContext';
import emojiAleatorio from '../../../../utils/outros/emojiAleatorio';
import fotoPerfil from '../../../../utils/outros/fotoPerfil';
import Botao from '../../../outros/botao';
import Ajuda from '../../../svg/ajuda';
import Configuracao from '../../../svg/configuracao';
import Coracao from '../../../svg/coracao';
import Inbox from '../../../svg/inbox';
import Item from '../../../svg/item';
import Seguranca from '../../../svg/seguranca';
import Styles from './menu.usuario.module.scss';

interface iParametros {
    isExibirMenuUsuario: boolean;
    setIsExibirMenuUsuario: Dispatch<boolean>;
    debounceFecharMenuUsuario: { (this: unknown, ...args: [] & any[]): Promise<void>; cancel: (reason?: any) => void; }; // debounce;
}

export default function MenuUsuario({ isExibirMenuUsuario, setIsExibirMenuUsuario, debounceFecharMenuUsuario }: iParametros) {

    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? 'usuário';

    function abrirMenuUsuario() {
        setIsExibirMenuUsuario(true);
        debounceFecharMenuUsuario.cancel();
    }

    return (
        <Fragment>
            <div className={Styles.divMenu} onMouseEnter={() => abrirMenuUsuario()}>
                <Image src={fotoPerfil()} width={30} height={30} alt='' />

                {
                    isExibirMenuUsuario && (
                        <div className={Styles.divPainel}>
                            <div className={`${Styles.wrapperDivPainel} animate__animated animate__fadeInUp animate__faster`}>
                                <b>Olá,&nbsp;<span className='cor-principal'>@{nomeUsuario}</span> {emojiAleatorio()}</b>

                                <div className={`${Styles.divItens} margem1`}>
                                    <Botao texto='Meu perfil' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />

                                    <Link href='/xxx'><a><Item width={16} url={null} title={null} />&nbsp;&nbsp;Subir novo item</a></Link>
                                    <Link href='/xxx'><a><Inbox width={16} url={null} title={null} />&nbsp;&nbsp;Inbox</a></Link>
                                    <Link href='/xxx'><a><Coracao width={16} url={null} title={null} />&nbsp;&nbsp;Favoritos</a></Link>
                                    <Link href='/seguranca'><a><Seguranca width={16} url={null} title={null} />&nbsp;&nbsp;Segurança</a></Link>
                                    <Link href='/ajuda'><a><Ajuda width={16} url={null} title={null} />&nbsp;&nbsp;Ajuda</a></Link>
                                    <Link href='/xxx'><a><Configuracao width={16} url={null} title={null} />&nbsp;&nbsp;Configurações</a></Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}