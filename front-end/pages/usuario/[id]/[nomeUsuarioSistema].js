import { useContext, useEffect, useState } from 'react';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS from '../../../utils/data/constUsuarios';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';

export default function Perfil({ usuario }) {
    // console.log(cursos);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioId = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Título da página;
        document.title = usuario.length > 0 ? `GeekSpot — Cursos de ${usuario[0]?.xxx}` : 'GeekSpot';
    }, [usuarioId, usuario]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem5'>
            <div className='centralizarTexto'>
                <span className='titulo'>Perfil de <span className='grifar'>{usuario[0]?.xxx.xxx}</span></span>
            </div>

            <div className='margem3'>

            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas os usuários;
    const url = CONSTANTS_USUARIOS.API_URL_GET_TODOS;
    const usuarios = await Fetch.getApi(url, null);

    // Gerar o "paths";
    const paths = usuarios?.map(u => ({
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

export async function getStaticProps(context) {
    const id = context.params.id;

    // Usuário;
    const url = `${CONSTANTS_USUARIOS.API_URL_GET_POR_CURSO_CATEGORIA_ID}/${id}`;
    const usuario = await Fetch.getApi(url, null);

    return {
        props: {
            usuario
        },
        // revalidate: 10 // segundos
    }
}