import Image from 'next/image';
import { Dispatch, Fragment } from 'react';
import useEmoji from '../../../../hooks/outros/useEmoji';
import { Auth } from '../../../../utils/context/usuarioContext';
import fotoPerfil from '../../../../utils/outros/fotoPerfil';
import Styles from './menu.usuario.module.scss';
import MenuUsuarioOpcoes from './menu.usuario.opcoes';

interface iParametros {
    isExibirMenuUsuario: boolean;
    setIsExibirMenuUsuario: Dispatch<boolean>;
    debounceFecharMenuUsuario: { (this: unknown, ...args: [] & any[]): Promise<void>; cancel: (reason?: any) => void; }; // debounce;
}

export default function MenuUsuario({ isExibirMenuUsuario, setIsExibirMenuUsuario, debounceFecharMenuUsuario }: iParametros) {

    const idUsuario = Auth?.get()?.usuarioId ?? 0;
    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';
    const emoji = useEmoji();

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
                                <b>Olá,&nbsp;<span className='cor-principal'>@{nomeUsuario}</span> {emoji}</b>

                                <div className={`${Styles.divItens} margem1`}>
                                    <MenuUsuarioOpcoes isMeuPerfilBotao={true} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}