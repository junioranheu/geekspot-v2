import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;
}

export default function SessaoEsquerda({ usuario }: iParametros) {

    console.log(usuario);

    return (
        <div className={Styles.sessaoEsquerda}>
            <h1>{usuario?.nomeCompleto}</h1>
        </div>
    )
}

