import { useEffect, useState } from 'react';
import CONSTS_SISTEMA from '../../../utils/consts/sistema';
import { Auth } from '../../../utils/context/usuarioContext';
import CONSTS_USUARIOS from '../../../utils/data/constUsuarios';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';

export default function Perfil({ usuario }: any) {
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        document.title = usuario ? `Perfil de @${usuario?.nomeUsuarioSistema} — ${CONSTS_SISTEMA.NOME_SISTEMA}` : CONSTS_SISTEMA.NOME_SISTEMA;
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, [usuarioId, usuario]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem3'>
            <div className='centralizarTexto'>
                <span className='titulo'>Perfil de <span className='grifar'>@{usuario?.nomeUsuarioSistema}</span></span>
            </div>

            <div className='margem2'>
                Teste
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas os usuários;
    const url = CONSTS_USUARIOS.API_URL_GET_TODOS;
    const usuarios = await Fetch.getApi(url, null);

    // Gerar o "paths";
    const paths = usuarios?.map((u: any) => ({
        params: {
            id: u.usuarioId.toString(),
            nomeUsuarioSistema: ajustarUrl(u.nomeUsuarioSistema)
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context: any) {
    const id = context.params.id;

    // Usuário;
    const url = `${CONSTS_USUARIOS.API_URL_GET_POR_ID}/${id}`;
    const usuario = await Fetch.getApi(url, null);
    // console.log(usuario);

    return {
        props: {
            usuario
        },
        // revalidate: 10 // segundos
    }
}
