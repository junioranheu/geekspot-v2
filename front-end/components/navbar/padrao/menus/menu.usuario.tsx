import Image from 'next/image';
import { Dispatch, Fragment, useContext, useEffect } from 'react';
import useEmoji from '../../../../hooks/outros/useEmoji';
import ImgCinza from '../../../../static/image/outros/cinza.webp';
import CONSTS_UPLOAD from '../../../../utils/consts/data/constUpload';
import { Auth, UsuarioContext } from '../../../../utils/context/usuarioContext';
import Styles from './menu.usuario.module.scss';
import MenuUsuarioOpcoes from './menu.usuario.opcoes';

interface iParametros {
    isExibirMenuUsuario: boolean;
    setIsExibirMenuUsuario: Dispatch<boolean>;
    debounceFecharMenuUsuario: { (this: unknown, ...args: [] & any[]): Promise<void>; cancel: (reason?: any) => void; }; // debounce;
}

export default function MenuUsuario({ isExibirMenuUsuario, setIsExibirMenuUsuario, debounceFecharMenuUsuario }: iParametros) {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isFotoPerfilChanged, setIsFotoPerfilChanged] = [usuarioContext?.isFotoPerfilChangedContext[0], usuarioContext?.isFotoPerfilChangedContext[1]];

    const nomeUsuario = Auth?.get()?.nomeUsuarioSistema ?? '';
    const emoji = useEmoji();

    function abrirMenuUsuario() {
        setIsExibirMenuUsuario(true);
        debounceFecharMenuUsuario.cancel();
    }

    // Sempre que a variável "isFotoPerfilChanged" mudar, é porque houve uma alteração na foto de perfil,
    // Portanto é necessário que se force a alteração da imagem (através de uma lógica);
    useEffect(() => {
        setTimeout(function () {
            setIsFotoPerfilChanged(false); // Retornar ao valor padrão de false;
        }, 1000);
    }, [isFotoPerfilChanged]);

    return (
        <Fragment>
            <div className={Styles.divMenu} onMouseEnter={() => abrirMenuUsuario()}>
                {
                    isFotoPerfilChanged ? (
                        <Image src={ImgCinza} width={30} height={30} alt='' />
                    ) : (
                        <Image src={(Auth?.get()?.foto ? `${CONSTS_UPLOAD.API_URL_GET_USUARIOS_IMAGENS}/${Auth?.get()?.foto}` : ImgCinza)} width={30} height={30} alt='' />
                    )
                }

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